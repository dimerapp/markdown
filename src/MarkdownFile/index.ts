/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import hastscript from 'hastscript'
import visit from 'unist-util-visit'
import mdastToc from 'mdast-util-toc'
import frontmatter from 'front-matter'
import toHast from 'mdast-util-to-hast'
import { basename, dirname } from 'path'
import toString from 'hast-util-to-string'
import unified, { Settings } from 'unified'
import VMessage, { VFileMessage } from 'vfile-message'

/**
 * Remark imports
 */
import gfm from 'remark-gfm'
import slug from 'remark-slug'
import markdown from 'remark-parse'
import directive from 'remark-directive'
import headings from 'remark-autolink-headings'
import squeezeParagraphs from 'remark-squeeze-paragraphs'

/**
 * Rehype imports
 */
import raw from 'rehype-raw'
import remarkToRehype from 'remark-rehype'

/**
 * Local imports
 */
import {
	Point,
	Position,
	StatsNode,
	hastTypes,
	mdastTypes,
	ReferenceNode,
	LeafDirective,
	TextDirective,
	ContainerDirective,
	MarkdownFileOptions,
	MarkdownFileJson,
} from '../Contracts'

import { Macros } from '../Macros'
import { Compiler } from '../Compiler'
import { getProtocol, parseThematicBlock } from '../utils'

/**
 * Exposes the API to process markdown contents for a given file using unified,
 * remark and rehype.
 */
export class MarkdownFile {
	/**
	 * Tracked assets to avoid duplicates
	 */
	private trackedAssets: Set<string> = new Set()

	/**
	 * Macros manager
	 */
	private macros = new Macros(this)

	/**
	 * Registered hooks
	 */
	private hooks: {
		test: string | ((node: mdastTypes.Content, file: MarkdownFile) => boolean)
		visitor: (node: mdastTypes.Content, file: MarkdownFile) => void
	}[] = []

	/**
	 * Collection of unified plugins
	 */
	private unifiedPlugins: { callback: unified.Plugin<any>; settings?: any }[] = []

	/**
	 * File state
	 */
	public state: 'idle' | 'processing' | 'processed' = 'idle'

	/**
	 * Reference to the file path
	 */
	public filePath?: string = this.options.filePath

	/**
	 * Reference to the file basename
	 */
	public basename?: string = this.filePath ? basename(this.filePath) : undefined

	/**
	 * Reference to the file dirname
	 */
	public dirname?: string = this.filePath ? dirname(this.filePath) : undefined

	/**
	 * Document collected stats
	 */
	public stats: StatsNode = {
		assets: [],
	}

	/**
	 * Reference to the document table of content. Only available when "options.generateToc = true"
	 */
	public toc: hastTypes.Element | null

	/**
	 * Find if a document has a fatal message or not
	 */
	public hasFatalMessages: boolean = false

	/**
	 * Array of reported messages
	 */
	public messages: VFileMessage[] = []

	/**
	 * Reference to the file parsed front matter
	 */
	public frontmatter: { [key: string]: any }

	/**
	 * Excerpt generated from the summary.
	 */
	public excerpt?: string

	/**
	 * Processed markdown summary to AST.
	 */
	public summary?: hastTypes.Root

	/**
	 * Parsed AST. Available after "process" call
	 */
	public ast?: hastTypes.Root

	/**
	 * A factory function to create hash script node
	 */
	public hastFactory = hastscript

	constructor(public contents: string, public options: MarkdownFileOptions = {}) {
		this.boot()
	}

	/**
	 * Boot method parses the yaml front matter right away
	 */
	private boot() {
		const { attributes, body, bodyBegin } = frontmatter<{
			[key: string]: any
		}>(this.contents)

		this.frontmatter = attributes

		/**
		 * Patch the remaining contents with empty whitespace. This will ensure
		 * that the ast location points to the correct line + col
		 */
		this.contents = `${new Array(bodyBegin).join('\n')}${body}`
	}

	/**
	 * Cleanup by releasing values no longer required
	 */
	private cleanup() {
		this.unifiedPlugins = []
		this.hooks = []
		this.trackedAssets.clear()
		this.macros.clear()
	}

	/**
	 * Convert mdast to hast
	 */
	private useRehype(stream: unified.Processor) {
		/**
		 * Configure stream to process HTML. The "rehype-raw" plugin is required to properly
		 * re-parse HTML nodes. Mdast is not good in recognizing HTML
		 */
		if (this.options.allowHtml === true) {
			return stream
				.use(remarkToRehype, { allowDangerousHtml: this.options.allowHtml === true })
				.use(raw)
		} else {
			return stream.use(remarkToRehype)
		}
	}

	/**
	 * Add compiler to the unified stream
	 */
	private useCompiler(stream: unified.Processor) {
		return stream.use(function () {
			const compiler = new Compiler()
			this.Compiler = compiler.compile.bind(compiler)
		})
	}

	/**
	 * Returns the matching hooks for a given node
	 */
	private getNodeHooks(node: mdastTypes.Content) {
		return this.hooks.filter((hook) => {
			if (typeof hook.test === 'function') {
				return hook.test(node, this)
			}
			return node.type === hook.test
		})
	}

	/**
	 * Processes pre-defined hooks for the matching nodes.
	 */
	private processHooks(stream: unified.Processor) {
		/**
		 * Return early if no hooks are defined
		 */
		if (this.hooks.length === 0) {
			return stream
		}

		return stream.use(() => {
			return (tree) => {
				visit(tree, (node: mdastTypes.Content) => {
					this.getNodeHooks(node).forEach((hook) => hook.visitor(node, this))
				})
			}
		})
	}

	/**
	 * Process the markdown contents
	 */
	private async processContents() {
		/**
		 * Markdown + gfm + headings with id + auto linking headings
		 */
		const stream = unified()
			.use(markdown)
			.use(gfm)
			.use(slug)
			.use(headings)
			.use(() => {
				return (tree) => {
					/**
					 * Attach meta data to codeblocks
					 */
					visit(tree, 'code', (node: mdastTypes.Code) => {
						const block = node.meta ? `${node.lang} ${node.meta}` : node.lang!
						const meta = parseThematicBlock(block) as any
						if (meta.lang) {
							node.lang = meta.lang
						}
						node.meta = meta
					})
				}
			})

		/**
		 * Enable directives and macros
		 */
		if (this.options.enableDirectives === true) {
			stream.use(directive).use(() => this.macros.transform.bind(this.macros))
		}

		/**
		 * Stick custom plugins
		 */
		this.unifiedPlugins.forEach((plugin) => stream.use(plugin.callback, ...plugin.settings))

		/**
		 * Generate toc when generateToc is set to true
		 */
		if (this.options.generateToc === true) {
			stream.use(() => {
				return (tree) => {
					/**
					 * Generate table of contents and convert to hast tree
					 */
					const toc = mdastToc(tree, { maxDepth: this.options.tocDepth || 3 }).map
					if (toc) {
						this.toc = toHast(toc) as hastTypes.Element
					}
				}
			})
		}

		/**
		 * Collect assets
		 */
		if (this.options.collectAssets === true) {
			this.on('image', (node: mdastTypes.Image) => {
				this.addAsset(node.url, 'image')
			})
		}

		/**
		 * Final set of mdast plugins to squeeze empty paragraphs. Should be the
		 * last mdast plugin
		 */
		stream.use(squeezeParagraphs)

		/**
		 * Process hooks on the mdast tree
		 */
		this.processHooks(stream)

		/**
		 * Convert to rehype
		 */
		this.useRehype(stream)

		/**
		 * Stick compiler
		 */
		this.useCompiler(stream)

		this.ast = (await stream.process(this.contents)).result as hastTypes.Root
	}

	/**
	 * Process the file summary as markdown
	 */
	private async processSummary() {
		if (!this.frontmatter.summary) {
			return
		}

		/**
		 * Markdown + gfm (headings and autolinking not required here)
		 */
		const stream = unified().use(markdown).use(gfm)

		/**
		 * Convert to rehype
		 */
		this.useRehype(stream)

		/**
		 * Stick compiler
		 */
		this.useCompiler(stream)

		/**
		 * Get summary and its plain text excerpt
		 */
		this.summary = (await stream.process(this.frontmatter.summary)).result as hastTypes.Root
		this.excerpt = toString(this.summary)
	}

	/**
	 * Report error message
	 */
	public report(reason: string, position?: Position | Point, rule?: string): VFileMessage {
		const message = new VMessage(reason, position, rule)
		this.messages.push(message)
		return message
	}

	/**
	 * Define inline macro
	 */
	public inlineMacro(
		name: string,
		cb: (node: TextDirective | LeafDirective, file: this, removeNode: () => void) => void
	): this {
		this.macros.add(name, cb)
		return this
	}

	/**
	 * Define container macro
	 */
	public macro(
		name: string,
		cb: (node: ContainerDirective, file: this, removeNode: () => void) => void
	): this {
		this.macros.add(name, cb)
		return this
	}

	/**
	 * Track asset
	 */
	public addAsset(url: string, type: string): this {
		if (this.trackedAssets.has(url)) {
			return this
		}

		const protocol = getProtocol(url)

		const asset: ReferenceNode = {
			originalUrl: url,
			url: url,
			type: type,
			isRelative: !protocol,
			isLocal: !protocol || protocol === 'file:',
		}

		this.trackedAssets.add(url)
		this.stats.assets.push(asset)
		return this
	}

	/**
	 * Hook into link node
	 */
	public on(
		test: string | ((node: mdastTypes.Content, file: this) => boolean),
		cb: (node: mdastTypes.Content, file: this) => void
	): this {
		this.hooks.push({ test, visitor: cb })
		return this
	}

	/**
	 * Define unified plugin
	 */
	public transform<S extends any[] = [Settings?]>(
		callback: unified.Plugin<S>,
		...settings: S
	): this {
		this.unifiedPlugins.push({ callback, settings })
		return this
	}

	/**
	 * Process the file
	 */
	public async process() {
		if (this.state !== 'idle') {
			throw new Error('Cannot re-process the same markdown file')
		}

		this.state = 'processing'
		await Promise.all([this.processSummary(), this.processContents()])
		this.state = 'processed'

		this.cleanup()

		return this.ast
	}

	/**
	 * JSON representation of the file
	 */
	public toJSON(): MarkdownFileJson {
		return {
			state: this.state,
			stats: this.stats,
			ast: this.ast,
			summary: this.summary,
			excerpt: this.excerpt,
			frontmatter: this.frontmatter,
			messages: this.messages,
			...(this.filePath
				? { filePath: this.filePath, dirname: this.dirname, basename: this.basename }
				: {}),
			...(this.options.generateToc ? { toc: this.toc! } : {}),
		}
	}
}
