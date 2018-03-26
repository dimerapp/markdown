'use strict'

/*
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const test = require('japa')
const Markdown = require('..')
const fixtures = require('../fixtures')

test.group('Markdown', () => {
  for (let name in fixtures) {
    const fixture = fixtures[name]
    test(`assert ${name}`, async (assert) => {
      const md = new Markdown(fixture.in)
      const file = await md.toHTML()
      assert.equal(file.toString(), fixture.out)
    })
  }
})
