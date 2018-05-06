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
 * Updates the url of the image node by calling the
 * callback promise
 *
 * @method updateUrl
 *
 * @param  {Function} cb
 * @param  {Object}   img
 *
 * @return {Promise}
 */
function updateUrl (cb, img) {
  return cb(img.url)
    .then((absUrl) => {
      if (absUrl) {
        img.url = absUrl
      }
    })
    .catch(() => {
    })
}

module.exports = function (callback) {
  return function transformer (tree, file, next) {
    if (typeof (callback) !== 'function') {
      return next()
    }

    /**
     * Passing tree to the definations node, so that we can pull
     * definitions later
     */
    const defination = definitions(tree)
    const images = []

    visit(tree, 'image', visitor)
    visit(tree, 'imageReference', visitor)

    function visitor (node) {
      const img = node.type === 'imageReference' ? defination(node.identifier) : node
      if (!img || !img.url.trim() || (!img.url.startsWith('.') && !img.url.startsWith('/'))) {
        return
      }

      images.push(img)
    }

    /**
     * Since visitor function is sync, we can expect it to collect all images
     * before we reach here
     */
    Promise
      .all(images.map((image) => updateUrl(callback, image)))
      .then(() => {
        next()
      })
  }
}
