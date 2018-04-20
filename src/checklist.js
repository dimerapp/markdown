'use strict'

/**
 * dimer-markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const visit = require('unist-util-visit')

module.exports = function () {
  return transformer

  function transformer (tree, file) {
    visit(tree, 'listItem', visitor)

    function visitor (node) {
      if (node.checked === null) {
        return false
      }

      node.children.forEach((child) => {
        if (child.type === 'paragraph') {
          const value = child.children[0].value
          const position = child.children[0].position
          child.children[0] = {
            type: 'paragraph',
            children: [{ type: 'text', value, position }]
          }
        }
      })
    }
  }
}
