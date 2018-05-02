'use strict'

/*
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const urlParser = require('url')

/**
 * Returns the embed node for an iframe. The URL and others
 * props are set via `props` parameter.
 *
 * @method getEmbedNode
 *
 * @param {String} className
 * @param {Object} props
 */
function getEmbedNode (className, props) {
  return {
    type: 'EmbedNode',
    data: {
      hName: 'div',
      hProperties: {
        className: [`embed ${className}`]
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

/**
 * Returns the alert node for showing alerts
 *
 * @method getAlertNode
 *
 * @param {String} className
 * @param {Array} children
 */
function getAlertNode (className, children) {
  return {
    type: 'NoteNode',
    data: {
      hName: 'div',
      hProperties: {
        className: [`alert ${className}`]
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
function ensureDomainUrl (url, macroName, fromDomains) {
  if (!url) {
    return `Url missing for ${macroName} macro`
  }

  fromDomains = Array.isArray(fromDomains) ? fromDomains : [fromDomains]
  const matched = fromDomains.find((domain) => url.indexOf(domain) > -1)
  if (!matched) {
    return `The ${macroName} macro needs a complete http URL`
  }
}

module.exports = function (macro) {
  /**
   * Adds a note macro to the remark parser. Can be used as
   *
   * [note]
   * This is a note
   * [/note]
   */
  macro.addMacro('note', function (content, props, { transformer, eat }) {
    return getAlertNode('alert-note', transformer.tokenizeBlock(content, eat.now()))
  })

  /**
   * Adds a warning macro to the remark parser. Can be used as
   *
   * [warn]
   * This is a warning
   * [/warn]
   */
  macro.addMacro('warn', function (content, props, { transformer, eat }) {
    return getAlertNode('alert-warning', transformer.tokenizeBlock(content, eat.now()))
  })

  /**
   * Adds a tip macro to the remark parser. Can be used as
   *
   * [tip]
   * This is a tip
   * [/tip]
   */
  macro.addMacro('tip', function (content, props, { transformer, eat }) {
    return getAlertNode('alert-tip', transformer.tokenizeBlock(content, eat.now()))
  })

  /**
   * Embeds codepen iframe by using codepen macro
   *
   * [codepen url=https://codepen.io/ge1doot/pen/vRJyVG]
   */
  macro.addMacro('codepen', function (props, { transformer, eat, badNode }) {
    const url = props.url || null
    const theme = props.theme || 'light'

    const errorMessage = ensureDomainUrl(url, 'codepen', 'codepen.io')
    if (errorMessage) {
      return badNode(errorMessage)
    }

    const height = props.height || 410
    const urlSegments = url.replace(/http(s)?:\/\/codepen.io/, '').split('/')
    const username = urlSegments[1]
    const penId = urlSegments[urlSegments.length - 1]

    const embedUrl = `//codepen.io/${username}/embed/preview/${penId}?height=${height}&theme-id=${theme}&default-tab=result&embed-version=2`

    return getEmbedNode('codepen', {
      src: embedUrl,
      height: height,
      scrolling: 'no',
      title: penId,
      frameborder: 'none',
      allowtransparency: 'true',
      allowfullscreen: 'true',
      style: 'width: 100%;'
    })
  }, true)

  /**
   * Adds a macro to embed Youtube videos
   *
   * [youtube url=https://youtu.be/xKwHGewa9Fg]
   * [/youtube]
   */
  macro.addMacro('youtube', function (props, { transformer, eat, badNode }) {
    const url = props.url || null
    const errorMessage = ensureDomainUrl(url, 'youtube', ['youtube.com/watch', 'youtu.be'])

    if (errorMessage) {
      return badNode(errorMessage)
    }

    /**
     * Make sure video id exists
     */
    const parsedUrl = urlParser.parse(url)
    let videoId = null

    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.replace(/^\//, '')
    } else {
      const matchedTokens = /v=(\w+)/.exec(parsedUrl.query)
      videoId = matchedTokens ? matchedTokens[1] : ''
    }

    if (!videoId) {
      return badNode('The youtube macro needs a youtube/watch or youtu.be URL')
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`
    const width = props.width || '100%'
    const height = props.height || '400'

    return getEmbedNode('youtube', {
      src: embedUrl,
      width: width,
      height: height,
      frameborder: 'none',
      allow: 'autoplay; encrypted-media',
      allowfullscreen: true
    })
  }, true)

  /**
   * Adds a collapse macro to the remark parser. Can be used as
   *
   * [collapse title=""]
   * This is a tip
   * [/collapse]
   */
  macro.addMacro('collapse', function (content, props, { transformer, eat, badNode }) {
    if (!props.title) {
      return badNode('Make sure to give a title to the collapse macro')
    }

    return {
      type: 'DetailsNode',
      data: {
        hName: 'details'
      },
      children: [
        {
          type: 'SummaryNode',
          data: {
            hName: 'summary'
          },
          children: [{
            type: 'text',
            value: props.title
          }]
        }
      ].concat(transformer.tokenizeBlock(content, eat.now()))
    }
  })
}
