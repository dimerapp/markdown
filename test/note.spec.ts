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
import note from '../src/Macros/Collection/note'

test.group('Note', () => {
	test('transform notes', async (assert) => {
		const contents = dedent`
		:::note
		This is a note
		:::
		`

		const file = new MarkdownFile(contents, { enableDirectives: true })
		note(file)
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
