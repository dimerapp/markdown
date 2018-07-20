/*
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Parses nodes for JSON structure. Attempts to drop
 * unwanted properties and shorten names to save
 * space.
 *
 * @method exports
 *
 * @param  {Object} node
 *
 * @return {Object}
 */
module.exports = function parseAsJSON (node) {
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
