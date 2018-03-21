'use strict'

/*
 * dimer-markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const unified = require('unified')
const markdown = require('remark-parse')
const html = require('remark-html')
const slug = require('remark-slug')
const headings = require('remark-autolink-headings')

let macroRegex = /^\[(\w+)(.*)\]\n/

function attacher () {
	const { blockMethods, blockTokenizers } = this.Parser.prototype
	blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'macro')

	blockTokenizers.macro = function (eat, value, silent) {
		const isMacroStart = macroRegex.exec(value)
		if (!isMacroStart) {
			return
		}

		const blocks = []
		let isMacro = false
		const tokens = value.split('\n')

		while (tokens.length) {
			const token = tokens.shift()
			blocks.push(token)

			if (token.trim() === `[/${isMacroStart[1]}]`) {
				isMacro = true
				break
			}
		}

		if (!isMacro) {
			return
		}

		eat(blocks.join('\n'))
	}
}

class MarkdownProcessor {
	constructor (markdown, options) {
		this.markdown = markdown
		this.options = Object.assign({
			sanitize: require('./github.json')
		}, options)
	}

	toHTML () {
		return new Promise((resolve, reject) => {
			unified()
				.use(markdown)
				.use(slug)
				.use(headings)
				.use(attacher)
				.use(html, this.options)
				.process(this.markdown, (error, file) => {
					if (error) {
						return reject(error)
					}
					resolve(file.toString())
				})
		})
	}
}

module.exports = MarkdownProcessor