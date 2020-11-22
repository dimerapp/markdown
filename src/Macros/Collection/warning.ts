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
 * Wrap markup inside div with class "alert-warning"
 */
export default function (mdFile: MarkdownFile) {
	mdFile.macro('warning', (node) => {
		node.data = node.data || {}
		node.data.hName = 'div'
		node.data.hProperties = {
			className: ['alert', 'alert-warning'],
			role: 'alert',
		}
	})
}
