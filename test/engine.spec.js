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
const dedent = require('dedent')

test.group('Engine', () => {
  test('use metadata title when there is no h1', async (assert) => {
    const content = dedent`
    Hello world, this is something awesome
    `
    const md = new Markdown(content, { title: 'Hello world' })
    const html = await md.toHTML()
    assert.equal(html.contents.trim(), '<h1 id="hello-world"><a href="#hello-world" aria-hidden="true"><span class="icon icon-link"></span></a>Hello world</h1>\n<p>Hello world, this is something awesome</p>')
  })
})
