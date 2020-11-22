import { join } from 'path'
import { readFileSync } from 'fs'

const css = readFileSync(join(__dirname, './style.css'), 'utf-8')

export const template = (doc: {
	contents: string
	toc?: string
	summary?: string
	excerpt?: string
}) => {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="${doc.excerpt}">
		<title>Document</title>
		<style>
			.note {
				border: 1px solid #666;
				padding: 20px 10px;
			}
		</style>
		<style>${css}</style>
	</head>
	<body>
		<div class="note">
			<h2> Summary of the doc </h2>
			${doc.summary}
		</div>

		<div class="note">
			<h2> Table of contents </h2>
			${doc.toc}
		</div>

		<hr>

		${doc.contents}
		</body>
	</html>`
}
