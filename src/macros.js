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
const langParser = require('./langParser')

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
    return `define url prop on ${macroName} macro`
  }

  fromDomains = Array.isArray(fromDomains) ? fromDomains : [fromDomains]
  const matched = fromDomains.find((domain) => url.indexOf(domain) > -1)
  if (!matched) {
    return `invalid url domain`
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
      return badNode(errorMessage, 'invalid-codepen-domain')
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
      return badNode(errorMessage, 'invalid-yt-domain')
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
      return badNode('define valid youtube video url', 'invalid-yt-url')
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
      return badNode('define collapse title', 'missing-collapse-title')
    }

    return {
      type: 'CollapaseNode',
      data: {
        hName: 'div',
        hProperties: {
          className: 'collapsible'
        }
      },
      children: [
        {
          type: 'CollpaseToogleNode',
          data: {
            hName: 'div',
            hProperties: {
              className: 'collapsible-toggle'
            }
          },
          children: [{
            type: 'text',
            value: props.title
          }]
        },
        {
          type: 'CollapaseBodyNode',
          data: {
            hName: 'div',
            hProperties: {
              className: 'collapsible-content'
            }
          },
          children: transformer.tokenizeBlock(content, eat.now())
        }
      ]
    }
  })

  /**
   * Adds a codegroup macro the the remark parser. Can be used as
   *
   * [codegroup]
   * ```js
   * ```
   *
   * ```js
   * ```
   * [/codegroup]
   */
  macro.addMacro('codegroup', function (content, props, { transformer, eat }) {
    const contentNodes = transformer.tokenizeBlock(content, eat.now())

    if (!contentNodes.length) {
      return
    }

    /**
     * Tab nav block contains the actual navbar for
     * creating tabs. It will be
     * <div class="tab-head">
     *  <ul>
     *  <ul>
     * </div>
     */
    const tabNavNode = {
      type: 'TabNavWrapperNode',
      data: {
        hName: 'div',
        hProperties: {
          className: 'tab-head'
        }
      },
      children: [
        {
          type: 'TabNavNode',
          data: {
            hName: 'ul'
          },
          children: []
        }
      ]
    }

    /**
     * The tab body node contains the list of
     * codeblocks and their related content.
     * It will be
     *
     * <div class="tab-body">
     * </div>
     */
    const tabBodyNode = {
      type: 'TabBodyNode',
      data: {
        hName: 'div',
        hProperties: {
          className: 'tab-body'
        }
      },
      children: []
    }

    /**
     * Single tab node is a single item inside the
     * tab body. One item is shown at a time.
     * It will be
     *
     * <div class="tab-item">
     * </div>
     */
    const tabItemNode = () => {
      return {
        type: 'TabItemNode',
        data: {
          hName: 'div',
          hProperties: {
            className: 'tab-item'
          }
        },
        children: []
      }
    }

    /**
     * We start off with an empty tab. It's possible
     * that we never gonna hit a codeblock and
     * hence no li will be generated in that
     * case.
     *
     * So that will be a softly invalid node.
     */
    let recentNavItem = tabItemNode()
    tabBodyNode.children.push(recentNavItem)

    contentNodes.forEach((node, index) => {
      recentNavItem.children.push(node)

      if (node.type === 'code') {
        /**
         * Get lang and fileName from the code language. Chances
         * are both will be null.
         */
        const { fileName } = langParser(node.lang)

        /**
         * When lang and fileName both are null, then only option is
         * to make use of `Tab <index>` string
         */
        const tabTitle = fileName || `Tab ${tabBodyNode.children.length}`
        const slug = `tab-${tabBodyNode.children.length}`

        /**
         * Here we push a list item to the tab navigation ul. Which is
         * a nested child of a tab-head div.
         */
        tabNavNode.children[0].children.push({
          type: 'listItem',
          data: {
            hName: 'li',
            hProperties: {
              dataTitle: slug
            }
          },
          children: [{ type: 'text', value: tabTitle }]
        })

        /**
         * We set the id of the tab item, so that we can
         * toggle between em.
         */
        recentNavItem.data.hProperties.id = slug

        /**
         * Push one tab item to the tab body if we have more
         * content to go.
         */
        if (contentNodes.length !== index + 1) {
          recentNavItem = tabItemNode()
          tabBodyNode.children.push(recentNavItem)
        }
      }
    })

    return {
      type: 'TabNode',
      data: {
        hName: 'div',
        hProperties: {
          className: 'tabs'
        }
      },
      children: [tabNavNode, tabBodyNode]
    }
  })
}
