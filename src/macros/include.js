/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const { resolve, dirname, extname } = require('path')
const { readFileSync } = require('fs')

function wrapAsCodeBlock (props, content, partialPath) {
  if (!props.codeblock) {
    return content
  }

  /**
   * Use explicit language or pull from the partial extension
   */
  const language = props.language || extname(partialPath).substr(1)

  let prefix = '```' + language

  /**
   * Add the lineHighlight when exists
   */
  prefix += props.lineHighlight ? `{${props.lineHighlight}}` : `{}`

  /**
   * Add the displayName when exists
   */
  prefix += props.displayName ? `{${props.displayName}}` : `{}`

  /**
   * Wrap content inside prefix and end with the codeblock
   */
  return prefix + '\n' + content + '\n```'
}

module.exports = function (macro) {
  macro.addMacro('include', function (props, { transformer, badNode, eat }) {
    /**
     * Make sure path exists in the props
     */
    if (!props.path) {
      return badNode('define include path', 'missing-include-path')
    }

    /**
     * Make sure source file has path. This is to discourage include
     * usage inside string
     */
    if (!transformer.file.path) {
      return badNode('origin file path is missing', 'missing-origin-path')
    }

    /**
     * Partial absolute path
     */
    const partialPath = resolve(dirname(transformer.file.path), props.path)
    try {
      const contents = wrapAsCodeBlock(props, readFileSync(partialPath, 'utf-8'), partialPath)

      /**
       * Set the file path to the partial path, so that all internal
       * badNodes are captured with the partial path and not the
       * file path
       */
      transformer.file.path = partialPath

      const node = {
        type: 'root',
        children: transformer.tokenizeBlock(contents, { line: 1, column: 0 })
      }

      /**
       * Pop the file history to back to the original path
       */
      transformer.file.history.pop()

      return node
    } catch (error) {
      const message = error.code === 'ENOENT' ? `Broken partial reference ${props.path}` : error.message
      const code = error.code === 'ENOENT' ? 'broken-img-ref' : error.code
      return badNode(message, code)
    }
  }, true)
}
