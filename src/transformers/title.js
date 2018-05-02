'use strict'

/*
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const toString = require('mdast-util-to-string')

module.exports = function (title) {
  return function transformer (root) {
    const first = root.children[0]

    if (first && first.type === 'heading' && first.depth === 1) {
      root.children.unshift({
        type: 'TitleNode',
        data: {
          hName: 'dimertitle'
        },
        children: [{ type: 'text', value: toString(first) }]
      })
    } else if (title) {
      root.children.unshift({
        type: 'heading',
        depth: 1,
        children: [{
          type: 'text', value: title
        }]
      })
    }
  }
}
