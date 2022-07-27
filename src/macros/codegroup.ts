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
 * Group codeblocks inside tabs
 */
export default function (mdFile: MarkdownFile) {
  mdFile.macro('codegroup', (node, file, removeNode) => {
    const tabNames: string[] = []

    const nonCodeBlock = node.children.findIndex((child, index) => {
      if (child.type === 'code') {
        tabNames.push((child.meta as any).title || `Tab ${index + 1}`)
        return false
      }
      return true
    })

    /**
     * Report that intermediate child is not a codeblock
     */
    if (nonCodeBlock !== -1) {
      file.report(
        `Codegroup children at index "${nonCodeBlock}" is not a codeblock`,
        node.children[nonCodeBlock].position
      )
      removeNode()
      return
    }

    node.data = node.data || {}
    node.data.hName = 'div'
    node.data.hProperties = {
      dataTabs: JSON.stringify(tabNames),
      className: ['codegroup'],
    }
  })
}
