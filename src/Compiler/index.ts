/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Root, Node, Parent } from 'hast'

/**
 * Post processes the hast tree and removes the location nodes. Also invokes
 * the registered hooks (if provided)
 */
export class Compiler {
	constructor() {}

	/**
	 * Find if hast root node
	 */
	private isRoot(node: Root | Node | Parent): node is Root {
		return node.type === 'root'
	}

	/**
	 * Find if hast parent node
	 */
	private isParent(node: Root | Node | Parent): node is Parent {
		return node.type === 'element'
	}

	/**
	 * Traverse over hast tree and drop unncessary attributes like Lines & Columns
	 */
	private traverse(node: Root | Node, result: Node[]) {
		if (this.isRoot(node)) {
			node.children.forEach((child) => this.traverse(child, result))
			return
		}

		if (this.isParent(node)) {
			const children = []
			result.push({
				type: 'element',
				tagName: node.tagName,
				properties: node.properties,
				children,
			})

			node.children.forEach((child) => this.traverse(child, children))
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
	 * Process hast tree and invoke the registered hooks
	 */
	public compile(root: Root) {
		const result = []
		this.traverse(root, result)

		return {
			type: 'root',
			children: result,
			...(root.data ? { data: root.data } : {}),
		}
	}
}
