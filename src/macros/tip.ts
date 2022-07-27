/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { MarkdownFile } from '../markdown_file.js'

/**
 * Wrap markup inside div with class "alert-tip"
 */
export default function (mdFile: MarkdownFile) {
  mdFile.macro('tip', (node) => {
    node.data = node.data || {}
    node.data.hName = 'div'
    node.data.hProperties = {
      className: ['alert', 'alert-tip'],
      /**
       * We do not add the `role=alert` inside tip, since role=alert is meant
       * to inform the user about the things that needs immediate attention
       * and "tips" are not one of them
       */
    }
  })
}
