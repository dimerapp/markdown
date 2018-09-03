'use strict'

/**
 * dimer-markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const toc = require('mdast-util-toc')

/**
 * Returns the node for TOC
 *
 * @method getTocNode
 *
 * @param  {Object}   tree
 *
 * @return {Object}
 */
function getTocNode (tree) {
  const tocNode = toc(tree, { maxDepth: 3, loose: false })

  if (!tocNode.map || !tocNode.map.children[0] || !tocNode.map.children[0].children[1]) {
    return
  }

  return {
    type: 'TocNode',
    data: {
      hName: 'div',
      hProperties: {
        className: ['toc-container']
      }
    },
    children: [
      {
        type: 'TocTitleNode',
        data: {
          hName: 'h2'
        },
        children: [{ type: 'text', value: 'Table of contents' }]
      },
      tocNode.map.children[0].children[1]
    ]
  }
}

module.exports = function ({ skipToc }) {
  return function transformer (root) {
    /**
     * Do not generate toc when skip toc is set to true
     */
    if (skipToc) {
      return
    }

    const first = root.children[1]

    /**
     * Do not generate toc when h1 is missing
     */
    if (!first || first.type !== 'heading' || first.depth !== 1) {
      return
    }

    /**
     * Do not add toc when there is nothing other
     * than h1
     */
    const second = root.children[2]
    if (!second) {
      return
    }

    /**
     * Otherwise generate a toc node and insert it after first element
     * after h1. If first element after h1 is an h2, then put it
     * right after h1.
     */
    const tocNode = getTocNode(root)
    if (tocNode) {
      root.children.splice(second.type === 'heading' ? 2 : 3, 0, tocNode)
    }
  }
}
