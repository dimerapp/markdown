/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const macro = require('remark-macro')()

require('./codegroup')(macro)
require('./codepen')(macro)
require('./collapse')(macro)
require('./note')(macro)
require('./tip')(macro)
require('./warn')(macro)
require('./youtube')(macro)

module.exports = macro
