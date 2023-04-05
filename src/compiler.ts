/*
 * @dimerapp/markdown
 *
 * (c) DimerApp
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Root, Element, Text, ElementContent } from 'hast'

/**
 * Post processes the hast tree and removes the location nodes.
 */
export class Compiler {
  constructor() {}

  /**
   * Find if hast root node
   */
  #isRoot(node: Root | ElementContent): node is Root {
    return node.type === 'root'
  }

  /**
   * Find if hast parent node
   */
  #isParent(node: Root | ElementContent): node is Element {
    return node.type === 'element'
  }

  /**
   * Traverse over hast tree and drop unncessary attributes like Lines & Columns
   */
  #traverse(node: Root | ElementContent, result: (Element | Text)[]) {
    if (this.#isRoot(node)) {
      for (const child of node.children) {
        this.#traverse(child as Element, result)
      }
      return
    }

    if (this.#isParent(node)) {
      const children: Element[] = []
      result.push({
        type: 'element',
        tagName: node.tagName,
        properties: node.properties,
        children,
        ...(node.data ? { data: node.data } : {}),
      })

      for (const child of node.children) {
        this.#traverse(child, children)
      }

      return
    }

    if (node.type === 'text') {
      result.push({
        type: 'text',
        value: node.value,
      })
    }
  }

  /**
   * Process hast tree
   */
  compile(root: Root) {
    const result: Element[] = []
    this.#traverse(root, result)

    return {
      type: 'root',
      children: result,
      ...(root.data ? { data: root.data } : {}),
    }
  }
}
