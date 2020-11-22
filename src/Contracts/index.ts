/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Content } from 'mdast'
import { VFileMessage } from 'vfile-message'
import type { Node, Position, Point } from 'unist'
import type { Root, Parent, Element, Text } from 'hast'

export { Node, Position, Point, Root, Parent, Element, Text }

/**
 * Shape of the collected reference
 */
export type ReferenceNode = {
	url: string
	originalUrl: string
	type: string
	isLocal: boolean
	isRelative: boolean
}

/**
 * Shape of the stats node
 */
export type StatsNode = {
	assets: ReferenceNode[]
} & { [key: string]: any }

/**
 * Directives
 */
export type Directives = TextDirective | LeafDirective | ContainerDirective

/**
 * Text directive node
 */
export interface TextDirective extends Node {
	name: string
	type: 'textDirective'
	attributes: { [key: string]: string }
	children: (Content | Directives)[]
}

/**
 * Leaf directive node
 */
export interface LeafDirective extends Node {
	name: string
	type: 'leafDirective'
	attributes: { [key: string]: string }
	children: (Content | Directives)[]
}

/**
 * Container directive node
 */
export interface ContainerDirective extends Node {
	name: string
	type: 'containerDirective'
	attributes: { [key: string]: string }
	children: (Content | Directives)[]
}

/**
 * Options accepted by the file constructor
 */
export interface MarkdownFileOptions {
	generateToc?: boolean
	tocDepth?: 1 | 2 | 3 | 4 | 5 | 6
	allowHtml?: boolean
	filePath?: string
	enableDirectives?: boolean
	collectAssets?: boolean
}

/**
 * JSON representation of markdown file
 */
export interface MarkdownFileJson {
	state: 'idle' | 'processing' | 'processed'
	stats: StatsNode
	ast?: Root
	summary?: Root
	excerpt?: string
	frontmatter: { [key: string]: any }
	messages: VFileMessage[]
	filePath?: string
	dirname?: string
	basename?: string
	toc?: Parent
}
