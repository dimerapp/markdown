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
import codesandbox from '../src/Macros/Collection/codesandbox'

test.group('Codesandbox', () => {
	test('report error when url is missing', async (assert) => {
		const contents = dedent`
		::codesandbox{}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		codesandbox(file)
		await file.process()

		assert.lengthOf(file.messages, 1)
		assert.equal(file.messages[0].reason, '"codesandbox" macro needs a url prop to be functional')

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [],
		})
	})

	test('report error when url domain is not allowed', async (assert) => {
		const contents = dedent`
		::codesandbox{url="foo.com"}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		codesandbox(file)
		await file.process()

		assert.lengthOf(file.messages, 1)
		assert.equal(file.messages[0].reason, 'Invalid url domain. Must be one of "codesandbox.io"')

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [],
		})
	})

	test('embed codesandbox url', async (assert) => {
		const contents = dedent`
		::codesandbox{url="https://codesandbox.io/s/github/adonisjs/adonis-starter-codesandbox/tree/master/?file=/server.js"}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		codesandbox(file)
		await file.process()

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [
				{
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['embed', 'embed-codesandbox'],
					},
					children: [
						{
							type: 'element',
							tagName: 'iframe',
							properties: {
								src: `https://codesandbox.io/embed/github/adonisjs/adonis-starter-codesandbox/tree/master/`,
								style: 'width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;',
								allow:
									'accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking',
								sandbox: [
									'allow-forms',
									'allow-modals',
									'allow-popups',
									'allow-presentation',
									'allow-same-origin',
									'allow-scripts',
								],
							},
							children: [],
						},
					],
				},
			],
		})
	})

	test('forward attributes to codesandbox', async (assert) => {
		const contents = dedent`
		::codesandbox{url="https://codesandbox.io/s/github/adonisjs/adonis-starter-codesandbox/tree/master/?file=/server.js" codemirror=1}
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		codesandbox(file)
		await file.process()

		assert.deepEqual(file.ast!, {
			type: 'root',
			children: [
				{
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['embed', 'embed-codesandbox'],
					},
					children: [
						{
							type: 'element',
							tagName: 'iframe',
							properties: {
								src: `https://codesandbox.io/embed/github/adonisjs/adonis-starter-codesandbox/tree/master/?codemirror=1`,
								style: 'width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;',
								allow:
									'accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking',
								sandbox: [
									'allow-forms',
									'allow-modals',
									'allow-popups',
									'allow-presentation',
									'allow-same-origin',
									'allow-scripts',
								],
							},
							children: [],
						},
					],
				},
			],
		})
	})
})
