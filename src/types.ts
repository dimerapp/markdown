/*
 * @dimerapp/markdown
 *
 * (c) DimerApp
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type * as hastTypes from 'hast'
import type * as mdastTypes from 'mdast'
import { VFileMessage } from 'vfile-message'
import type { Node, Position, Point } from 'unist'
import type { MarkdownFile } from './markdown_file.js'

export { hastTypes, mdastTypes, Node, Point, Position }

/**
 * Markdown file plugin callback
 */
export type PluginCallback<Options extends any[]> = (
  file: MarkdownFile,
  ...options: Options
) => void

/**
 * Shape of the stats node
 */
export type StatsNode = Record<string, any>

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
  children: (mdastTypes.Content | Directives)[]
}

/**
 * Leaf directive node
 */
export interface LeafDirective extends Node {
  name: string
  type: 'leafDirective'
  attributes: { [key: string]: string }
  children: (mdastTypes.Content | Directives)[]
}

/**
 * Container directive node
 */
export interface ContainerDirective extends Node {
  name: string
  type: 'containerDirective'
  attributes: { [key: string]: string }
  children: (mdastTypes.Content | Directives)[]
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
}

/**
 * JSON representation of markdown file
 */
export interface MarkdownFileJson {
  state: 'idle' | 'processing' | 'processed'
  ast?: hastTypes.Root
  summary?: hastTypes.Root
  excerpt?: string
  frontmatter: { [key: string]: any }
  messages: VFileMessage[]
  filePath?: string
  dirname?: string
  basename?: string
  toc?: hastTypes.Parent
  stats: StatsNode
}

/**
 * Shape of the codeblock
 */
export type Code = mdastTypes.Code & {
  meta: {
    highlights: number[]
    inserts: number[]
    deletes: number[]
    title: null | string
  }
}
