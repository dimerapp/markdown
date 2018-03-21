'use strict'

/*
 * dimer-markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const Markdown = require('../index')
const path = require('path')
const content = require('fs').readFileSync(path.join(__dirname, './index.md'), 'utf-8')

new Markdown(content)
	.toHTML()
	.then(console.log)
	.catch(console.log)