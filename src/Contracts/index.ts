/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type * as hastTypes from 'hast'
import type * as mdastTypes from 'mdast'
import { VFileMessage } from 'vfile-message'
import type { Node, Position, Point } from 'unist'

export type Code = mdastTypes.Code & {
  meta: {
    lang: null | string
    highlights: number[]
    inserts: number[]
    deletes: number[]
    marks: { [key: string]: { start: number; end: number }[] }
    fileName: null | string
  }
}

export { Node, Position, Point }
export { hastTypes }
export { mdastTypes }

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
  collectAssets?: boolean
}

/**
 * JSON representation of markdown file
 */
export interface MarkdownFileJson {
  state: 'idle' | 'processing' | 'processed'
  stats: StatsNode
  ast?: hastTypes.Root
  summary?: hastTypes.Root
  excerpt?: string
  frontmatter: { [key: string]: any }
  messages: VFileMessage[]
  filePath?: string
  dirname?: string
  basename?: string
  toc?: hastTypes.Parent
}
