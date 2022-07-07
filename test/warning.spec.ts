/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import dedent from 'ts-dedent'
import { MarkdownFile } from '../src/MarkdownFile'
import warning from '../src/Macros/Collection/warning'

test.group('Warnings', () => {
  test('transform warnings', async ({ assert }) => {
    const contents = dedent`
		:::warning
		This is a warning
		:::
		`

    const file = new MarkdownFile(contents, { enableDirectives: true })
    warning(file)
    await file.process()

    assert.deepEqual(file.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['alert', 'alert-warning'],
            role: 'alert',
          },
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'This is a warning',
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
