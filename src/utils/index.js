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

const utils = exports = module.exports = {}

/**
 * Parses the value defined next to 3 back ticks
 * in a codeblock and set line-highlights or
 * filename from it
 *
 * @param {String} lang
 */
utils.parseThematicBlock = function parseThematicBlock (lang) {
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

/**
 * Returns the alert node for showing alerts
 *
 * @method getAlertNode
 *
 * @param {String} className
 * @param {Array} children
 */
utils.getAlertNode = function getAlertNode (className, children) {
  return {
    type: 'NoteNode',
    data: {
      hName: 'div',
      hProperties: {
        className: ['alert', className]
      }
    },
    children: children
  }
}

/**
 * Returns an an error when url is not part of any give
 * domains.
 *
 * @method ensureDomainUrl
 *
 * @param {String} url
 * @param {String} macroName
 * @param {Array|String} fromDomains
 */
utils.ensureDomainUrl = function ensureDomainUrl (url, macroName, fromDomains) {
  if (!url) {
    return `define url prop on ${macroName} macro`
  }

  fromDomains = Array.isArray(fromDomains) ? fromDomains : [fromDomains]
  const matched = fromDomains.find((domain) => url.indexOf(domain) > -1)

  if (!matched) {
    return 'invalid url domain'
  }
}

/**
 * Returns the embed node for an iframe. The URL and others
 * props are set via `props` parameter.
 *
 * @method getEmbedNode
 *
 * @param {String} className
 * @param {Object} props
 */
utils.getEmbedNode = function getEmbedNode (className, props) {
  return {
    type: 'EmbedNode',
    data: {
      hName: 'div',
      hProperties: {
        className: ['embed', className]
      }
    },
    children: [
      {
        type: 'IFrameNode',
        data: {
          hName: 'iframe',
          hProperties: props
        }
      }
    ]
  }
}
