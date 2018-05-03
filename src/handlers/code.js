'use strict'

/**
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const detab = require('detab')
const u = require('unist-builder')

const defaultNode = {
  lang: null,
  lineHighlights: null,
  fileName: null
}

/**
 * Parses the value defined next to 3 back ticks
 * in a codeblock and set line-highlights or
 * filename from it
 *
 * @param {String} lang
 */
function parseThematicBlock (lang) {
  /**
   * Language property on node is missing
   */
  if (!lang) {
    return defaultNode
  }

  /**
   * No language is defined
   */
  const match = lang.match(/^[^ \t]+(?=[ \t]|$)/)
  if (!match || !match.length) {
    return defaultNode
  }

  const tokens = match[0].split('{')
  return {
    lang: `language-${tokens[0]}`,
    lineHighlights: tokens[1] ? tokens[1].replace('}', '') : null,
    fileName: tokens[2] ? tokens[2].replace('}', '') : null
  }
}

module.exports = function (h, node) {
  const value = node.value ? detab(node.value + '\n') : ''
  const { lang, lineHighlights, fileName } = parseThematicBlock(node.lang)

  const props = {
    className: lang ? [lang, 'line-numbers'] : ['line-numbers']
  }

  if (lineHighlights) {
    props.dataLine = lineHighlights
  }

  const childs = []

  /**
   * If filename, then set the data-title property on
   * pre and set span as a first child
   */
  if (fileName) {
    props.dataTitle = fileName
    childs.push(h(node, 'span', { className: 'filename' }, [u('text', fileName)]))
  }

  /**
   * Set pre as a child
   */
  childs.push(h(node, 'pre', props, [
    h(node, 'code', [u('text', value)])
  ]))

  return h(node.position, 'div', { className: 'dimer-highlight' }, childs)
}
