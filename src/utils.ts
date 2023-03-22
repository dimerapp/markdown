/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse } from 'node:url'
import { toHtml as hastToHtml } from 'hast-util-to-html'

import { MarkdownFile } from './markdown_file.js'

const CACHE: Map<string, string | null> = new Map()

/**
 * Returns the protocol for a given url. Using a cache to avoid
 * re-parsing the same url again and again
 */
export function getProtocol(url: string): string | null {
  if (CACHE.has(url)) {
    return CACHE.get(url)!
  }

  const { protocol } = parse(url)
  CACHE.set(url, protocol)
  return protocol
}

/**
 * A helper to generate html for a given markdown file
 */
export function toHtml(file: MarkdownFile) {
  const output: {
    contents: string
    summary?: string
    toc?: string
    excerpt?: string
  } = {
    contents: hastToHtml(file.ast!, {
      allowDangerousHtml: file.options.allowHtml === true,
      allowDangerousCharacters: file.options.allowHtml === true,
    }),
  }

  if (file.summary) {
    output.summary = hastToHtml(file.summary, {
      allowDangerousHtml: file.options.allowHtml === true,
      allowDangerousCharacters: file.options.allowHtml === true,
    })
  }

  if (file.toc) {
    output.toc = hastToHtml(file.toc)
  }

  if (file.excerpt) {
    output.excerpt = file.excerpt
  }

  return output
}

/**
 * Validates the url property accepted by macros
 */
export function ensureDomainUrl(url: string | null, macroName: string, fromDomains: string[]) {
  if (!url) {
    return `"${macroName}" macro needs a url prop to be functional`
  }

  fromDomains = Array.isArray(fromDomains) ? fromDomains : [fromDomains]
  const matched = fromDomains.find((domain) => url.indexOf(domain) > -1)

  if (!matched) {
    return `Invalid url domain. Must be one of "${fromDomains.join(', ')}"`
  }
}

/**
 * Object builder to conditionally add properties to the
 * object
 */
export class ObjectBuilder {
  private state: any = {}

  add(key: string, value: any) {
    if (value === undefined || value === null) {
      return
    }
    this.state[key] = value
  }

  toJSON() {
    return this.state
  }
}
