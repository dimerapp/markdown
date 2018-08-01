/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const urlParser = require('url')
const { ensureDomainUrl, getEmbedNode } = require('../utils/index')

module.exports = function (macro) {
  macro.addMacro('youtube', function (props, { transformer, eat, badNode }) {
    const { url, width, height } = Object.assign({
      url: null,
      width: '100%',
      height: '400'
    }, props)

    /**
     * Validate for youtube domains
     */
    const errorMessage = ensureDomainUrl(url, 'youtube', ['youtube.com/watch', 'youtu.be'])
    if (errorMessage) {
      return badNode(errorMessage, 'invalid-yt-domain')
    }

    let videoId = null

    const parsedUrl = urlParser.parse(url)

    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.replace(/^\//, '')
    } else {
      const matchedTokens = /v=(\w+)/.exec(parsedUrl.query)
      videoId = matchedTokens ? matchedTokens[1] : ''
    }

    /**
     * Ensure existence of video id
     */
    if (!videoId) {
      return badNode('define valid youtube video url', 'invalid-yt-url')
    }

    return getEmbedNode('youtube', {
      src: `https://www.youtube.com/embed/${videoId}`,
      width: width,
      height: height,
      frameborder: 'none',
      allow: 'autoplay; encrypted-media',
      allowfullscreen: true
    })
  }, true)
}
