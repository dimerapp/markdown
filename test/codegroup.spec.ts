/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { MarkdownFile } from '../src/MarkdownFile'
import codegroup from '../src/Macros/Collection/codegroup'

test.group('Codegroup', () => {
	test('group codeblocks into tabs', async (assert) => {
		const contents = [
			':::codegroup',
			'```',
			'```',
			`const a = require('a')`,
			`const b = require('b')`,
			':::',
		].join('\n')

		const file = new MarkdownFile(contents, { enableDirectives: true })

		codegroup(file)
		await file.process()

		console.log(file.ast)
	})
})
