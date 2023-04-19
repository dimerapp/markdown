/*
 * @dimerapp/markdown
 *
 * (c) DimerApp
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { dedent } from 'ts-dedent'

import { note } from '../src/macros/note.js'
import { MarkdownFile } from '../src/markdown_file.js'

test.group('Note', () => {
  test('transform notes', async ({ assert }) => {
    const contents = dedent`
		:::note
		This is a note
		:::
		`

    const file = new MarkdownFile(contents, { enableDirectives: true })
    file.use(note)
    await file.process()

    assert.deepEqual(file.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['alert', 'alert-note'],
          },
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'This is a note',
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
