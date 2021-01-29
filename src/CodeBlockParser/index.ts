/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
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
 * Parses the highlights and marks inside the codeblock
 * content
 */
export class CodeBlockParser {
	private highlightBlocks = 0
	private insertBlocks = 0
	private deleteBlocks = 0
	private highlights: number[] = []
	private inserts: number[] = []
	private deletes: number[] = []
	private marks: { [key: string]: { start: number; end: number }[] } = {}

	private currentLine = 0
	private parsedContent: string[] = []

	/**
	 * Process marks
	 */
	private processMarks(line: string) {
		let result: any = null

		while ((result = /{::(.+?)::}/g.exec(line))) {
			if (!this.marks[this.currentLine]) {
				this.marks[this.currentLine] = []
			}

			const subsititue = result[1]
			const match = result[0]

			this.marks[this.currentLine].push({
				start: result.index,
				end: result.index + subsititue.length,
			})

			line = `${line.substring(0, result.index)}${subsititue}${line.substring(
				result.index + match.length
			)}`
		}

		return line
	}

	/**
	 * Process highlights
	 */
	private processHighlights(line: string) {
		const trimmedLine = line.trim()

		if (trimmedLine === HIGHLIGHT_BLOCK_START) {
			this.highlightBlocks++
			return
		}

		if (trimmedLine === HIGHLIGHT_BLOCK_END) {
			this.highlightBlocks--
			return
		}

		if (trimmedLine === INSERT_BLOCK_START) {
			this.insertBlocks++
			return
		}

		if (trimmedLine === DELETE_BLOCK_START) {
			this.deleteBlocks++
			return
		}

		if (trimmedLine === INSERT_BLOCK_END) {
			this.insertBlocks--
			return
		}

		if (trimmedLine === DELETE_BLOCK_END) {
			this.deleteBlocks--
			return
		}

		this.currentLine++

		if (this.insertBlocks > 0) {
			this.inserts.push(this.currentLine)
			this.parsedContent.push(this.processMarks(line))
			return
		}

		if (this.deleteBlocks > 0) {
			this.deletes.push(this.currentLine)
			this.parsedContent.push(this.processMarks(line))
			return
		}

		if (this.highlightBlocks > 0) {
			this.highlights.push(this.currentLine)
			this.parsedContent.push(this.processMarks(line))
			return
		}

		this.parsedContent.push(this.processMarks(line))
	}

	/**
	 * Parses the contents to look for highlights, inserts, deletes
	 * and marks
	 */
	public parse(contents: string) {
		contents.split('\n').forEach((line) => this.processHighlights(line))
		return {
			content: this.parsedContent.join('\n'),
			inserts: this.inserts,
			highlights: this.highlights,
			deletes: this.deletes,
			marks: this.marks,
		}
	}
}
