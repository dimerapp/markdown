/*
 * @dimerapp/markdown
 *
 * (c) DimerApp
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { codegroup } from '../src/macros/codegroup.js'
import { MarkdownFile } from '../src/markdown_file.js'

test.group('Codegroup', () => {
  test('group codeblocks into tabs', async ({ assert }) => {
    const contents = [
      ':::codegroup',
      '```',
      `const a = require('a')`,
      '```',
      '```',
      `const b = require('b')`,
      '```',
      ':::',
    ].join('\n')

    const file = new MarkdownFile(contents, { enableDirectives: true })
    file.use(codegroup)
    await file.process()

    assert.deepEqual(file.ast?.children[0].properties, {
      dataTabs: JSON.stringify(['Tab 1', 'Tab 2']),
      className: ['codegroup'],
    })
  })

  test('group codeblocks with filename into tabs', async ({ assert }) => {
    const contents = [
      ':::codegroup',
      '```',
      '// title: Hello world',
      `const a = require('a')`,
      '```',
      '```',
      `const b = require('b')`,
      '```',
      ':::',
    ].join('\n')

    const file = new MarkdownFile(contents, { enableDirectives: true })
    file.use(codegroup)
    await file.process()

    assert.deepEqual(file.ast?.children[0].properties, {
      dataTabs: JSON.stringify(['Hello world', 'Tab 2']),
      className: ['codegroup'],
    })
  })

  test('raise error when intermediate children is not a codeblock', async ({ assert }) => {
    const contents = [':::codegroup', 'Hello', '```', `const b = require('b')`, '```', ':::'].join(
      '\n'
    )

    const file = new MarkdownFile(contents, { enableDirectives: true })
    file.use(codegroup)
    await file.process()

    assert.lengthOf(file.messages, 1)
    assert.equal(file.messages[0].message, 'Codegroup children at index "0" is not a codeblock')
    assert.equal(file.messages[0].line, 2)
    assert.equal(file.messages[0].column, 1)
    assert.deepEqual(file.ast, { type: 'root', children: [] })
  })

  test('serialize code group attributes', async ({ assert }) => {
    const contents = [
      ':::codegroup{id="pkg-selector"}',
      '```',
      `const a = require('a')`,
      '```',
      '```',
      `const b = require('b')`,
      '```',
      ':::',
    ].join('\n')

    const file = new MarkdownFile(contents, { enableDirectives: true })
    file.use(codegroup)
    await file.process()

    assert.deepEqual(file.ast?.children[0].properties, {
      dataTabs: JSON.stringify(['Tab 1', 'Tab 2']),
      className: ['codegroup'],
      id: 'pkg-selector',
    })
  })
})
