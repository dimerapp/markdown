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
const macroEngine = require('remark-macro')()

const { title, checklist, relativeLinks, toc } = require('./src/transformers')
require('./src/macros')(macroEngine)

/**
 * Proceses the markdown and output it to
 * HTML or react components.
 *
 * @class MarkdownProcessor
 */
class MarkdownProcessor {
  static compileHooks = []

  constructor (markdown, options) {
    this.markdown = markdown

    this.settings = {
      sanitize: require('./github.json'),
      handlers: require('./src/handlers')
    }

    this.options = options || {}
  }

  /**
   * Define callbacks to be invoked before the markdown
   * document is compiled
   */
  static beforeCompile (callback) {
    this.compileHooks.push(callback)
  }

  /**
   * Register a custom macro with the markdown engine
   *
   * @method addMacro
   * @static
   *
   * @param  {String}   name
   * @param  {Function} callback
   * @param  {Boolean}  inline
   */
  static addMacro (name, callback, inline) {
    macroEngine.addMacro(name, callback, inline)
  }

  /**
   * Returns the stream of mdast
   *
   * @method getStream
   *
   * @return {Object}
   */
  getStream () {
    this.constructor.compileHooks.forEach((callback) => {
      if (typeof (callback) === 'function') {
        callback(this)
      }
    })

    return unified()
      .use(markdown)
      .use(title, this.options)
      .use(toc, this.options)
      .use(relativeLinks, this.options)
      .use(slug)
      .use(headings)
      .use(macroEngine.transformer)
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
