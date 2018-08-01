/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const { getAlertNode } = require('../utils/index')

module.exports = function (macro) {
  macro.addMacro('tip', function (content, props, { transformer, eat }) {
    return getAlertNode('alert-tip', transformer.tokenizeBlock(content, eat.now()))
  })
}
