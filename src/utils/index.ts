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
import rangeParser from 'parse-numeric-range'
import { MarkdownFile } from '../MarkdownFile'

const CACHE: Map<string, string | null> = new Map()

/**
 * Default response for the parseThematicBlock when no
 * lang is defined
 */
const DEFAULT_NODE = {
	lang: null,
	lineHighlights: null,
	fileName: null,
}

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

	public add(key: string, value: any) {
		if (value === undefined || value === null) {
			return
		}
		this.state[key] = value
	}

	public toJSON() {
		return this.state
	}
}

/**
 * Parse thematic block next to "```"
 */
export function parseThematicBlock(
	lang: string
): {
	lang: null | string
	lineHighlights: null | number[]
	fileName: null | string
} {
	/**
	 * Language property on node is missing
	 */
	if (!lang) {
		return DEFAULT_NODE
	}

	const tokens = lang.split('{')
	const language = tokens[0].match(/^[^ \t]+(?=[ \t]|$)/)

	return {
		lang: language ? language[0] : null,
		lineHighlights: tokens[1] ? rangeParser(tokens[1].replace('}', '')) : null,
		fileName: tokens[2] ? tokens[2].replace('}', '') : null,
	}
}
