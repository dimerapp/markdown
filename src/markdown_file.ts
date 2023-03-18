/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import fm from 'front-matter'
import { visit } from 'unist-util-visit'
import { VFileMessage } from 'vfile-message'
import { toHast } from 'mdast-util-to-hast'
import { h as hastscript } from 'hastscript'
import { basename, dirname } from 'node:path'
import { toString } from 'hast-util-to-string'
import { toc as mdastToc } from 'mdast-util-toc'
import { unified, Plugin, Processor } from 'unified'

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
  hastTypes,
  StatsNode,
  Directives,
  mdastTypes,
  MarkdownFileJson,
  MarkdownFileOptions,
  PluginCallback,
} from './types.js'

import { Compiler } from './compiler.js'
import { Macros } from './macros_manager.js'
import { CodeBlockParser } from './codeblock_parser.js'

/**
 * Exposes the API to process markdown contents for a given file using unified,
 * remark and rehype.
 */
export class MarkdownFile {
  /**
   * Macros manager
   */
  #macros = new Macros(this)

  /**
   * Registered hooks
   */
  #hooks: {
    test: string | ((node: any, file: MarkdownFile) => boolean)
    visitor: (node: any, file: MarkdownFile) => void
  }[] = []

  /**
   * A collection of markdown file plugins
   */
  #plugins: { callback: PluginCallback<any>; options?: any }[] = []

  /**
   * Collection of unified plugins
   */
  #unifiedPlugins: { callback: Plugin<any>; settings?: any }[] = []

  /**
   * File state
   */
  state: 'idle' | 'processing' | 'processed' = 'idle'

  /**
   * Reference to the file path
   */
  filePath?: string

  /**
   * Reference to the file basename
   */
  basename?: string = this.filePath ? basename(this.filePath) : undefined

  /**
   * Reference to the file dirname
   */
  dirname?: string = this.filePath ? dirname(this.filePath) : undefined

  /**
   * Attach arbitary stats to the file
   */
  stats: StatsNode = {}

  /**
   * Reference to the document table of content. Only available when "options.generateToc = true"
   */
  toc: hastTypes.Element | null = null

  /**
   * Find if a document has a fatal message or not
   */
  hasFatalMessages: boolean = false

  /**
   * Array of reported messages
   */
  messages: VFileMessage[] = []

  /**
   * Reference to the file parsed front matter
   */
  frontmatter: { [key: string]: any }

  /**
   * Excerpt generated from the summary.
   */
  excerpt?: string

  /**
   * Processed markdown summary to AST.
   */
  summary?: { type: 'root'; children: hastTypes.Element[] }

  /**
   * Parsed AST. Available after "process" call
   */
  ast?: { type: 'root'; children: hastTypes.Element[] }

  /**
   * A factory function to create hash script node
   */
  hastFactory: typeof hastscript = hastscript

  constructor(public contents: string, public options: MarkdownFileOptions = {}) {
    /** @ts-expect-error */
    const { attributes, body, bodyBegin } = fm<{
      [key: string]: any
    }>(this.contents)

    this.filePath = this.options.filePath
    this.frontmatter = attributes

    /**
     * Here we intentionally patch the public options to reflect the options
     * defined in front matter. This is done, so that any other part of the
     * codebase relying on the `file.options` property get the final set
     * of options and not just the initial options.
     *
     * ------------------------------------------------------------------
     * ONLY FOLLOWING OPTIONS ARE ENTERTAINED
     * ------------------------------------------------------------------
     *
     * generateToc?: boolean
     * tocDepth?: 1 | 2 | 3 | 4 | 5 | 6
     */
    if (this.frontmatter.generateToc !== undefined) {
      this.options.generateToc = this.frontmatter.generateToc
    }
    if (this.frontmatter.tocDepth !== undefined) {
      this.options.tocDepth = this.frontmatter.tocDepth
    }

    /**
     * Patch the remaining contents with empty whitespace. This will ensure
     * that the ast location points to the correct line + col
     */
    this.contents = `${new Array(bodyBegin).join('\n')}${body}`
  }

  /**
   * Cleanup by releasing values no longer required
   */
  #cleanup() {
    this.#unifiedPlugins = []
    this.#plugins = []
    this.#hooks = []
    this.#macros.clear()
  }

  /**
   * Unified plugin function to convert mdast to hast
   */
  #useRehype(stream: Processor) {
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
   * Unified plugin to post process the hast tree
   */
  #useCompiler(stream: Processor) {
    return stream.use(function () {
      const compiler = new Compiler()
      this.Compiler = compiler.compile.bind(compiler)
    })
  }

  /**
   * Returns the matching hooks for a given AST node
   */
  #getNodeHooks(node: mdastTypes.Content) {
    return this.#hooks.filter((hook) => {
      if (typeof hook.test === 'function') {
        return hook.test(node, this)
      }
      return node.type === hook.test
    })
  }

  /**
   * Run pre-defined hooks for the matching nodes.
   */
  #runHooks(stream: Processor) {
    /**
     * Return early if no hooks are defined
     */
    if (this.#hooks.length === 0) {
      return stream
    }

    return stream.use(() => {
      return (tree) => {
        visit(tree, (node: any) => {
          for (const hook of this.#getNodeHooks(node)) {
            hook.visitor(node, this)
          }
        })
      }
    })
  }

  /**
   * Run registered plugins
   */
  #runPlugins() {
    for (const plugin of this.#plugins) {
      plugin.callback(this, ...plugin.options)
    }
  }

  /**
   * Process the markdown contents
   */
  async #processContents() {
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
            const { content, ...codeBlockMeta } = new CodeBlockParser().parse(node.value)

            node.value = content
            node.meta = codeBlockMeta as any
          })
        }
      })

    /**
     * Enable directives and macros
     */
    if (this.options.enableDirectives === true) {
      stream.use(directive).use(() => this.#macros.transform.bind(this.#macros))
    }

    /**
     * Stick custom plugins
     */
    for (const plugin of this.#unifiedPlugins) {
      stream.use(plugin.callback, ...plugin.settings)
    }

    /**
     * Generate toc when generateToc is set to true
     */
    if (this.options.generateToc === true) {
      stream.use(() => {
        return (tree) => {
          /**
           * Generate table of contents and convert to hast tree
           */
          const toc = mdastToc(tree, { maxDepth: this.options.tocDepth || 3, tight: true }).map
          if (!toc) {
            return
          }

          const firstListItem = toc.children.find((node) => node.type === 'listItem')
          if (!firstListItem) {
            return
          }

          const nestedUl = firstListItem.children.find((node) => node.type === 'list')
          if (nestedUl) {
            this.toc = toHast(nestedUl) as hastTypes.Element
          }
        }
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
    this.#runHooks(stream)

    /**
     * Convert to rehype
     */
    this.#useRehype(stream)

    /**
     * Stick output compiler
     */
    this.#useCompiler(stream)

    const { result } = await stream.process(this.contents)
    this.ast = result as { type: 'root'; children: hastTypes.Element[] }
  }

  /**
   * Process the file summary as markdown
   */
  async #processSummary() {
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
    this.#useRehype(stream)

    /**
     * Stick compiler
     */
    this.#useCompiler(stream)

    /**
     * Get summary and its plain text excerpt
     */
    const { result } = await stream.process(this.frontmatter.summary)
    this.summary = result as { type: 'root'; children: hastTypes.Element[] }
    this.excerpt = toString(this.summary)
  }

  /**
   * Report error message
   */
  report(reason: string, position?: Position | Point, rule?: string): VFileMessage {
    const message = new VFileMessage(reason, position, rule)
    this.messages.push(message)
    return message
  }

  /**
   * Define container macro
   */
  macro(
    name: string,
    cb: (node: Directives, file: MarkdownFile, removeNode: () => void) => void
  ): this {
    this.#macros.add(name, cb)
    return this
  }

  /**
   * Hook into link node
   */
  on(
    test: string | ((node: any, file: MarkdownFile) => boolean),
    cb: (node: any, file: MarkdownFile) => void
  ): this {
    this.#hooks.push({ test, visitor: cb })
    return this
  }

  /**
   * Register markdown file plugin
   */
  use<Options extends any[]>(callback: PluginCallback<Options>, ...options: Options): this {
    this.#plugins.push({ callback, options })
    return this
  }

  /**
   * Define unified plugin
   */
  transform<Args extends any[]>(callback: Plugin<Args>, ...settings: Args): this {
    this.#unifiedPlugins.push({ callback, settings })
    return this
  }

  /**
   * Process the file
   */
  async process() {
    if (this.state !== 'idle') {
      throw new Error('Cannot re-process the same markdown file')
    }

    this.state = 'processing'
    this.#runPlugins()
    await Promise.all([this.#processSummary(), this.#processContents()])
    this.state = 'processed'

    this.#cleanup()
    return this.ast
  }

  /**
   * JSON representation of the file
   */
  toJSON(): MarkdownFileJson {
    return {
      state: this.state,
      ast: this.ast,
      stats: this.stats,
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
