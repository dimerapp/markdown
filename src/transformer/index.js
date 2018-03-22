'use strict'

/*
 * markdown-dimer
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const macroRegex = /^\[(\w+)(.*)?\]\n/

module.exports = function () {
  const macros = {}

  function transformNodes (eat, value, silent) {
    const match = macroRegex.exec(value)
    if (!match || match.index !== 0 || silent) {
      return
    }

    let [$, macro, props] = match
    macro = macro.trim()

    /**
     * Return when the syntax matches but there is
     * no registered macro for same
     */
    if (!macros[macro]) {
      return
    }

    /**
     * The macro tag and it's properties
     */
    const tag = {
      macro,
      isClosed: false,
      body: [],
      children: [],
      props: props || ''
    }

    const lines = value.split('\n')

    /**
     * Loop over all the lines until we find a closing tag
     * or the content ends. If there is no ending content
     * then we add a missing macro node for linter
     */
    while (lines.length) {
      const line = lines.shift()

      tag.body.push(line)

      /**
       * Found ending tag. So break
       * the loop
       */
      if (line === `[/${macro}]`) {
        tag.isClosed = true
        break
      }

      if (line !== `[${macro}]`) {
        tag.children.push(line)
      }
    }

    /**
     * Done with all the content, but the tag was never
     * closed
     */
    if (!tag.isClosed) {
      setMissingMacroNode($, eat, macro)
      return
    }

    const propsHash = getProps(tag.props)
    const astNode = macros[macro](tag.children.join('\n'), propsHash)

    astNode ? eat(tag.body.join('\n'))(astNode) : eat(tag.body.join('\n'))
  }

  return {
    addMacro (name, fn) {
      if (macros[name]) {
        throw new Error(`Cannot redefine the macro with ${name}. One already exists`)
      }

      if (typeof (fn) !== 'function') {
        throw new Error('addMacro expects 2nd argument to be a function')
      }

      macros[name] = fn
      return this
    },

    transform () {
      const { blockMethods, blockTokenizers } = this.Parser.prototype
      blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'macro')
      blockTokenizers.macro = transformNodes
    }
  }
}
