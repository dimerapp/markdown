/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { MarkdownFile } from '../../MarkdownFile'

/**
 * Group codeblocks inside tabs
 */
export default function (mdFile: MarkdownFile) {
	mdFile.macro('codegroup', (node, file, removeNode) => {
		const nonCodeBlock = node.children.findIndex((child) => {
			return child.type !== 'code'
		})

		if (nonCodeBlock !== undefined) {
			file.report(`Codegroup children at index "${nonCodeBlock}" is not a codeblock`, node.position)
			removeNode()
		}
	})
}
