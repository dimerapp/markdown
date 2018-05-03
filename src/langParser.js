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
