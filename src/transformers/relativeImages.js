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

module.exports = function (cloudUrl, callback) {
  return function transformer (tree) {
    if (!cloudUrl || typeof (callback) !== 'function') {
      return
    }

    /**
     * Passing tree to the definations node, so that we can pull
     * definitions later
     */
    const defination = definitions(tree)

    /**
     * Bind visitor for image
     */
    visit(tree, 'image', visitor)

    /**
     * Bind visitor for image reference
     */
    visit(tree, 'imageReference', visitor)

    function visitor (node) {
      const img = node.type === 'imageReference' ? defination(node.identifier) : node

      /**
       * Ignore when url is not relative or url doesn't exists
       */
      if (!img || !img.url.trim() || (!img.url.startsWith('.') && !img.url.startsWith('/'))) {
        return
      }

      /**
       * Passing url to the callback, so that they can pull this file and work
       * with it.
       */
      callback(img.url)

      const nonRelativeChunks = img.url.split('/').filter((part) => part !== '.' && part !== '..')
      img.url = `${cloudUrl}/${nonRelativeChunks.join('/')}`
    }
  }
}
