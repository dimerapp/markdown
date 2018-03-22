'use strict'

/**
 * dimer-markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const dedent = require('dedent')
const unified = require('unified')
const markdown = require('remark-parse')
const html = require('remark-html')
const Macroable = require('../src/transformer')

const unifiedStream = () => unified().use(markdown)

const exec = function (content, stream) {
  return new Promise((resolve, reject) => {
    stream.process(content, (error, file) => {
      if (error) {
        return reject(error)
      }
      resolve(file)
    })
  })
}

test.group('Macroable', (group) => {
  test('call the fn when macro opening closing tags are detected', async (assert) => {
    const macroable = Macroable()
    assert.plan(2)

    macroable.addMacro('alert', function (props, content) {
      assert.deepEqual(props, {})
      assert.equal(content, '')
    })

    const template = dedent`
    Hello world!

    [alert]
    Hey dude
    [/alert]
    `

    const result = await exec(template, unifiedStream().use(macroable.transform).use(html))
    console.log(result)
  })
})
