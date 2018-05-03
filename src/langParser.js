'use strict'

/**
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

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
module.exports = function parseThematicBlock (lang) {
  /**
   * Language property on node is missing
   */
  if (!lang) {
    return defaultNode
  }

  const tokens = lang.split('{')
  const language = tokens[0].match(/^[^ \t]+(?=[ \t]|$)/)

  return {
    lang: language ? `language-${tokens[0].match(/^[^ \t]+(?=[ \t]|$)/)}` : null,
    lineHighlights: tokens[1] ? tokens[1].replace('}', '') : null,
    fileName: tokens[2] ? tokens[2].replace('}', '') : null
  }
}
