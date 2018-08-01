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

const setTitle = require('./src/transformers/title')
const checkList = require('./src/transformers/checklist')
const relativeLinks = require('./src/transformers/relativeLinks')
const toc = require('./src/transformers/toc')
const macro = require('./src/macros')

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
      .use(setTitle, this.metadata)
      .use(toc, this.metadata)
      .use(relativeLinks, this.metadata)
      .use(slug)
      .use(headings)
      .use(macro.transformer)
      .use(squeezeParagraphs)
      .use(checkList)
      .use(remark2rehype, { handlers: this.options.handlers })
      .use(minifyWhiteSpace)
      .use(sortValues)
      .use(sortAttrs)
      .use(sanitize, this.options.sanitize)
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
