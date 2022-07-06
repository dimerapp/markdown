/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import visit from 'unist-util-visit'

import { MarkdownFile } from '../MarkdownFile'
import { Node, LeafDirective, TextDirective, ContainerDirective } from '../Contracts'

/**
 * Allows registering macros to manually process directives.
 */
export class Macros {
  constructor(private file: MarkdownFile) {}

  /**
   * Registered macros
   */
  private macros: Map<string, (node: any, file: MarkdownFile, deleteNode?: () => void) => void> =
    new Map()

  /**
   * Clear registered macros
   */
  public clear() {
    this.macros.clear()
  }

  /**
   * Add macro
   */
  public add(name: string, cb: (node: Node, file: MarkdownFile, removeNode: () => void) => void) {
    this.macros.set(name, cb)
    return this
  }

  /**
   * The unified transform hook
   */
  public async transform(tree: Node) {
    /**
     * Visitor cannot be async, sine AST modifications has to be sync
     */
    visit(
      tree,
      ['textDirective', 'leafDirective', 'containerDirective'],
      (node: ContainerDirective | LeafDirective | TextDirective, index, parent) => {
        /**
         * Execute macro function if defined
         */
        const macroFn = this.macros.get(node.name)
        if (typeof macroFn !== 'function' || node.data?.isMacro === false) {
          const hastNode = this.file.hastFactory(node.name, node.attributes)
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

        macroFn.length === 3
          ? macroFn(node, this.file, () => {
              /**
               * Implementation reference https://unifiedjs.com/learn/recipe/remove-node/
               */
              parent!.children.splice(index, 1)
            })
          : macroFn(node, this.file)

        /**
         * Notify visit function that node has been removed
         */
        if (nodeRemoved) {
          return [visit.SKIP, index]
        }
      }
    )
  }
}
