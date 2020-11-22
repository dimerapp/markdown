/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse } from 'url'
import hastToHtml from 'hast-util-to-html'
import { MarkdownFile } from '../MarkdownFile'

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
