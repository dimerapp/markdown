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
  const openedTags = []

  function transformNodes (eat, value, silent) {
    const match = macroRegex.exec(value)

    if (!match || silent || match.index !== 0) {
      return
    }

    let [content, macro, props] = match
    macro = macro.trim()
    console.log(macros)

    if (!macros[macro]) {
      return
    }

    let tag = { macro, meta: eat.now(), closed: false }

    const contentLines = content.split()
    const childcontent = []

    while (contentLines.length) {
      const line = contentLines.shift()
      if (line !== macro) {
        childcontent.push(line)
      }

      if (line === `[/${macro}]`) {
        tag.closed = true
        break
      }
    }

    if (!tag.closed) {
      openedTags.push(tag)
      eat(content)
      return
    }

    eat(content)
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
