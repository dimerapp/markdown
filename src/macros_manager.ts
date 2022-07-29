/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { visit, SKIP } from 'unist-util-visit'

import { MarkdownFile } from './markdown_file.js'
import { Directives, LeafDirective, TextDirective, ContainerDirective } from './types.js'

/**
 * Exposes API to register and execute macros on MDAST containers
 */
export class Macros {
  #file: MarkdownFile

  constructor(file: MarkdownFile) {
    this.#file = file
  }

  /**
   * Registered macros
   */
  #macros: Map<string, (node: any, file: MarkdownFile, removeNode: () => void) => void> = new Map()

  /**
   * Clear registered macros
   */
  clear() {
    this.#macros.clear()
  }

  /**
   * Add macro
   */
  add(name: string, cb: (node: any, file: MarkdownFile, removeNode: () => void) => void) {
    this.#macros.set(name, cb)
    return this
  }

  /**
   * The unified transform hook
   */
  async transform(tree: Directives) {
    /**
     * Visitor cannot be async, sine AST modifications has to be sync
     */
    visit(
      tree,
      ['textDirective', 'leafDirective', 'containerDirective'],
      (
        node: ContainerDirective | LeafDirective | TextDirective,
        index: string | number,
        parent: any
      ) => {
        /**
         * Execute macro function if defined
         */
        const macroFn = this.#macros.get(node.name)
        if (typeof macroFn !== 'function' || node.data?.isMacro === false) {
          const hastNode = this.#file.hastFactory(node.name, node.attributes)
          node.data = node.data || {}
          node.data.hName = hastNode.tagName
          node.data.hProperties = hastNode.properties
          return
        }

        /**
         * Collect as post hook when returns a function. This is done to allow
         * the macro to run async functions. Actual macro function cannot be
         * async AST modifications has to be sync.
         */
        let nodeRemoved = false
        macroFn(node, this.#file, () => {
          /**
           * Implementation reference https://unifiedjs.com/learn/recipe/remove-node/
           */
          nodeRemoved = true
          parent!.children.splice(index, 1)
        })

        /**
         * Notify visit function that node has been removed
         */
        if (nodeRemoved) {
          return [SKIP, index]
        }
      }
    )
  }
}
