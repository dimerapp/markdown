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
