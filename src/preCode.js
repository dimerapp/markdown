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

/**
 * Adds line-numbers class to code blocks
 *
 * @method exports
 *
 * @return {Function}
 */
module.exports = function () {
  return transformer

  function transformer (tree, file) {
    visit(tree, 'code', visitor)

    function visitor (node) {
      const classProp = node.lang ? [`language-${node.lang}`] : []
      classProp.push('line-numbers')

      node.data = {
        hProperties: {
          className: classProp
        }
      }
    }
  }
}
