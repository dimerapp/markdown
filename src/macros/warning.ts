/*
 * @dimerapp/markdown
 *
 * (c) DimerApp
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { MarkdownFile } from '../markdown_file.js'

/**
 * Wrap markup inside div with class "alert-warning"
 */
export function warning(mdFile: MarkdownFile) {
  mdFile.macro('warning', (node) => {
    node.data = node.data || {}
    node.data.hName = 'div'
    node.data.hProperties = {
      className: ['alert', 'alert-warning'],
      role: 'alert',
    }
  })
}
