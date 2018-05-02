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
const squeezeParagraphs = require('remark-squeeze-paragraphs')

const setTitle = require('./src/title')
const checkList = require('./src/checkList')

const macro = require('remark-macro')()
require('./src/macros')(macro)

/**
 * Proceses the markdown and output it to
 * HTML or react components.
 *
 * @class MarkdownProcessor
 */
class MarkdownProcessor {
  constructor (markdown, metadata) {
    this.markdown = markdown
    this.options = {
      sanitize: require('./github.json'),
      handlers: require('./src/handlers')
    }
    this.metadata = metadata || {}
  }

  /**
   * Returns the stream of mdast
   *
   * @method getStream
   *
   * @return {Object}
   */
  getStream () {
    return unified()
      .use(markdown)
      .use(setTitle, this.metadata.title)
      .use(slug)
      .use(headings)
      .use(macro.transformer)
      .use(squeezeParagraphs)
      .use(checkList)
      .use(html, this.options)
  }

  /**
   * Converts markdown to HTML
   *
   * @method toHTML
   *
   * @return {File}
   */
  toHTML () {
    return new Promise((resolve, reject) => {
      this.getStream()
        .process(this.markdown, (error, file) => {
          if (error) {
            return reject(error)
          }
          resolve(file)
        })
    })
  }
}

module.exports = MarkdownProcessor
