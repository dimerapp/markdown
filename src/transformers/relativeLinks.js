'use strict'

/*
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const visit = require('unist-util-visit')
const definitions = require('mdast-util-definitions')

/**
 * Updates the url of the image or link node by calling the
 * callback promise
 *
 * @method updateUrl
 *
 * @param  {Function} cb
 * @param  {Object}   urlNode
 *
 * @return {Promise}
 */
function updateUrl (cb, urlNode) {
  return cb(urlNode.url)
    .then((response) => {
      if (response) {
        Object.assign(urlNode, response)
      }
    })
    .catch(() => {
    })
}

module.exports = function ({ onUrl: callback }) {
  return function transformer (tree, file, next) {
    if (typeof (callback) !== 'function') {
      return next()
    }

    /**
     * Passing tree to the definations node, so that we can pull
     * definitions later
     */
    const defination = definitions(tree)
    const urls = []

    visit(tree, 'image', visitor)
    visit(tree, 'imageReference', visitor)
    visit(tree, 'link', visitor)
    visit(tree, 'linkReference', visitor)

    function visitor (node) {
      const urlNode = ['imageReference', 'linkReference'].indexOf(node.type) > -1 ? defination(node.identifier) : node
      if (!urlNode || !urlNode.url.trim() || (!urlNode.url.startsWith('.') && !urlNode.url.startsWith('/'))) {
        return
      }
      urls.push(urlNode)
    }

    /**
     * Since visitor function is sync, we can expect it to collect all urls
     * before we reach here
     */
    Promise
      .all(urls.map((url) => updateUrl(callback, url)))
      .then(() => {
        next()
      })
  }
}
