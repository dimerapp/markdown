/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import dedent from 'ts-dedent'
import { MarkdownFile } from '../src/MarkdownFile'
import youtube from '../src/Macros/Collection/youtube'

test.group('Youtube', () => {
	test('raise error when url is missing', async (assert) => {
		const contents = dedent`
		::youtube{}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		youtube(file)
		await file.process()

		assert.lengthOf(file.messages, 1)
		assert.equal(file.messages[0].reason, 'Missing url prop on youtube macro')

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [],
		})
	})

	test('raise error when url is not from youtube.com or youtu.be', async (assert) => {
		const contents = dedent`
		::youtube{url="foo"}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		youtube(file)
		await file.process()

		assert.lengthOf(file.messages, 1)
		assert.equal(
			file.messages[0].reason,
			'Invalid url domain. Must be one of youtube.com/watch,youtu.be'
		)

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [],
		})
	})

	test('raise error when video id is missing in youtu.be url', async (assert) => {
		const contents = dedent`
		::youtube{url="https://youtu.be"}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		youtube(file)
		await file.process()

		assert.lengthOf(file.messages, 1)
		assert.equal(file.messages[0].reason, 'Invalid youtube url. Copy url from the address bar')

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [],
		})
	})

	test('raise error when video id is missing in youtube.com url', async (assert) => {
		const contents = dedent`
		::youtube{url="https://www.youtube.com/watch"}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		youtube(file)
		await file.process()

		assert.lengthOf(file.messages, 1)
		assert.equal(file.messages[0].reason, 'Invalid youtube url. Copy url from the address bar')

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [],
		})
	})

	test('embed from youtube.com url', async (assert) => {
		const contents = dedent`
		::youtube{url="https://www.youtube.com/watch?v=Hm14pyibQhQ&feature=youtu.be&t=2"}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		youtube(file)
		await file.process()

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [
				{
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['embed', 'embed-youtube'],
					},
					children: [
						{
							type: 'element',
							tagName: 'iframe',
							properties: {
								src: `https://www.youtube.com/embed/Hm14pyibQhQ`,
								width: '100%',
								height: 400,
								frameBorder: 'none',
								allow: 'autoplay; encrypted-media',
								allowFullScreen: 'true',
							},
							children: [],
						},
					],
				},
			],
		})
	})

	test('embed from youtu.be url', async (assert) => {
		const contents = dedent`
		::youtube{url="https://youtu.be/Hm14pyibQhQ?t=2"}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		youtube(file)
		await file.process()

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [
				{
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['embed', 'embed-youtube'],
					},
					children: [
						{
							type: 'element',
							tagName: 'iframe',
							properties: {
								src: `https://www.youtube.com/embed/Hm14pyibQhQ`,
								width: '100%',
								height: 400,
								frameBorder: 'none',
								allow: 'autoplay; encrypted-media',
								allowFullScreen: 'true',
							},
							children: [],
						},
					],
				},
			],
		})
	})
})
