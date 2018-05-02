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
  if (!lang) {
    return defaultNode
  }

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

  if (fileName) {
    props.dataFile = fileName
  }

  return h(node.position, 'pre', props, [
    h(node, 'code', [u('text', value)])
  ])
}
