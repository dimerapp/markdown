/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const { ensureDomainUrl, getEmbedNode } = require('../utils/index')

module.exports = function (macro) {
  macro.addMacro('codepen', function (props, { transformer, eat, badNode }) {
    const { url, theme, height } = Object.assign({
      url: null,
      theme: 'light',
      height: 410
    }, props)

    /**
     * Validate url domain
     */
    const errorMessage = ensureDomainUrl(url, 'codepen', 'codepen.io')
    if (errorMessage) {
      return badNode(errorMessage, 'invalid-codepen-domain')
    }

    const urlSegments = url.replace(/http(s)?:\/\/codepen.io/, '').split('/')
    const username = urlSegments[1]
    const penId = urlSegments[urlSegments.length - 1]

    /**
     * Validate existence of username and penid
     */
    if (!username || !penId) {
      return badNode('Bad codepen url', 'bad-codepen-url')
    }

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
}
