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
import tip from '../src/Macros/Collection/tip'

test.group('Tip', () => {
  test('transform tips', async ({ assert }) => {
    const contents = dedent`
		:::tip
		This is a tip
		:::
		`

    const file = new MarkdownFile(contents, { enableDirectives: true })
    tip(file)
    await file.process()

    assert.deepEqual(file.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['alert', 'alert-tip'],
          },
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'This is a tip',
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
