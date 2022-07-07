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
import video from '../src/Macros/Collection/video'

test.group('Video', () => {
  test('report error when url is missing', async ({ assert }) => {
    const contents = dedent`
		::video{}
		`

    const file = new MarkdownFile(contents, { enableDirectives: true })
    video(file)
    await file.process()

    assert.lengthOf(file.messages, 1)
    assert.equal(file.messages[0].reason, '"video" macro needs a url prop to be functional')

    assert.deepEqual(file.ast!, {
      type: 'root',
      children: [],
    })
  })

  test('embed video as mp4', async ({ assert }) => {
    const contents = dedent`
		::video{url="any-url-works.mp4"}
		`

    const file = new MarkdownFile(contents, { enableDirectives: true })
    video(file)
    await file.process()

    assert.deepEqual(file.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['embed', 'embed-video'],
          },
          children: [
            {
              type: 'element',
              tagName: 'video',
              properties: {},
              children: [
                {
                  type: 'element',
                  tagName: 'source',
                  properties: {
                    src: 'any-url-works.mp4',
                    type: 'video/mp4',
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
