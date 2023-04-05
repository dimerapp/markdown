/*
 * @dimerapp/markdown
 *
 * (c) DimerApp
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const HIGHLIGHT_BLOCK_START = '// highlight-start'
const HIGHLIGHT_BLOCK_END = '// highlight-end'
const INSERT_BLOCK_START = '// insert-start'
const INSERT_BLOCK_END = '// insert-end'
const DELETE_BLOCK_START = '// delete-start'
const DELETE_BLOCK_END = '// delete-end'

/**
 * Parses the highlights inside the codeblock content
 */
export class CodeBlockParser {
  #highlightBlocksCount = 0
  #insertBlocksCount = 0
  #deleteBlocksCount = 0
  #highlights: number[] = []
  #inserts: number[] = []
  #deletes: number[] = []

  #currentLine = 0
  #parsedContent: string[] = []
  #title: string | null = null

  /**
   * Process highlights
   */
  #processHighlights(line: string) {
    const trimmedLine = line.trim()

    if (trimmedLine === HIGHLIGHT_BLOCK_START) {
      this.#highlightBlocksCount++
      return
    }

    if (trimmedLine === HIGHLIGHT_BLOCK_END) {
      this.#highlightBlocksCount--
      return
    }

    if (trimmedLine === INSERT_BLOCK_START) {
      this.#insertBlocksCount++
      return
    }

    if (trimmedLine === DELETE_BLOCK_START) {
      this.#deleteBlocksCount++
      return
    }

    if (trimmedLine === INSERT_BLOCK_END) {
      this.#insertBlocksCount--
      return
    }

    if (trimmedLine === DELETE_BLOCK_END) {
      this.#deleteBlocksCount--
      return
    }

    if (trimmedLine.match(/^\/\/\s+title:/)) {
      this.#title = trimmedLine.replace(/^\/\/\s+title:/, '').trim()
      return
    }

    this.#currentLine++

    if (this.#insertBlocksCount > 0) {
      this.#inserts.push(this.#currentLine)
      this.#parsedContent.push(line)
      return
    }

    if (this.#deleteBlocksCount > 0) {
      this.#deletes.push(this.#currentLine)
      this.#parsedContent.push(line)
      return
    }

    if (this.#highlightBlocksCount > 0) {
      this.#highlights.push(this.#currentLine)
      this.#parsedContent.push(line)
      return
    }

    this.#parsedContent.push(line)
  }

  /**
   * Parses the contents to look for highlights, inserts, deletes
   * and marks
   */
  parse(contents: string) {
    for (const line of contents.split('\n')) {
      this.#processHighlights(line)
    }

    return {
      content: this.#parsedContent.join('\n'),
      title: this.#title,
      inserts: this.#inserts,
      highlights: this.#highlights,
      deletes: this.#deletes,
    }
  }
}
