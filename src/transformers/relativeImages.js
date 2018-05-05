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

module.exports = function (callback) {
  return function transformer (tree) {
    if (typeof (callback) !== 'function') {
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
       * with it and returns the absolute url. If the abs value is null, then
       * we don't touch the image.
       */
      const absUrl = callback(img.url)
      if (!absUrl) {
        return
      }

      img.url = absUrl
    }
  }
}
