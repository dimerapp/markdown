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
const slug = require('remark-slug')
const headings = require('remark-autolink-headings')
const squeezeParagraphs = require('remark-squeeze-paragraphs')
const minifyWhiteSpace = require('rehype-minify-whitespace')
const remark2rehype = require('remark-rehype')
const sanitize = require('rehype-sanitize')
const sortValues = require('rehype-sort-attribute-values')
const sortAttrs = require('rehype-sort-attributes')

const { title, checklist, relativeLinks, toc } = require('./src/transformers')
const macro = require('./src/macros')

/**
 * Proceses the markdown and output it to
 * HTML or react components.
 *
 * @class MarkdownProcessor
 */
class MarkdownProcessor {
  constructor (markdown, options) {
    this.markdown = markdown

    this.settings = {
      sanitize: require('./github.json'),
      handlers: require('./src/handlers')
    }

    this.options = options || {}
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
      .use(title, this.options)
      .use(toc, this.options)
      .use(relativeLinks, this.options)
      .use(slug)
      .use(headings)
      .use(macro.transformer)
      .use(squeezeParagraphs)
      .use(checklist, this.options)
      .use(remark2rehype, { handlers: this.settings.handlers })
      .use(minifyWhiteSpace)
      .use(sortValues)
      .use(sortAttrs)
      .use(sanitize, this.settings.sanitize)
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
        .use(require('./src/compilers/html'))
        .process(this.markdown, (error, file) => {
          if (error) {
            return reject(error)
          }
          resolve(file)
        })
    })
  }

  /**
   * Converts the markdown document to it's JSON structure. Super
   * helpful for JSON API's
   *
   * @method toJSON
   *
   * @return {Promise<Object>}
   */
  toJSON () {
    return new Promise((resolve, reject) => {
      this.getStream()
        .use(require('./src/compilers/json'))
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
