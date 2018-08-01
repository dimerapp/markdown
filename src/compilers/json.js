/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Parses nodes for JSON structure. Attempts to drop
 * unwanted properties.
 */
function parseAsJSON (node) {
  if (node.type === 'element') {
    return {
      type: 'element',
      tag: node.tagName,
      props: node.properties,
      children: node.children.map(parseAsJSON)
    }
  }

  if (node.type === 'text') {
    return {
      type: 'text',
      value: node.value
    }
  }

  console.log('node missed', node.type)
}

/**
 * JSON compiler
 */
module.exports = function () {
  this.Compiler = function (root) {
    return {
      type: 'root',
      children: root.children.map(parseAsJSON)
    }
  }
}
