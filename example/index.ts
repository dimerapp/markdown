/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'path'
import { readFileSync } from 'fs'
import { createServer } from 'http'

import { template } from './template'
import { MarkdownFile, toHtml, macros } from '../index'

const mdFilePath = join(__dirname, './sample.md')
const mdContents = readFileSync(mdFilePath, 'utf-8')
const routesImage = readFileSync(join(__dirname, './routes.png'))

createServer(async (req, res) => {
	if (req.url === '/routes.png') {
		res.writeHead(200, { 'content-type': 'image/png' })
		res.end(routesImage)
		return
	}

	const md = new MarkdownFile(mdContents, {
		filePath: mdFilePath,
		allowHtml: req.url?.includes('allowHtml=true'),
		enableDirectives: req.url?.includes('enableDirectives=true'),
		generateToc: true,
		collectAssets: true,
	})

	macros.codesandbox(md)
	macros.youtube(md)
	macros.note(md)
	macros.tip(md)
	macros.warning(md)
	macros.video(md)

	await md.process()
	res.writeHead(200, { 'content-type': 'text/html' })
	res.end(template(toHtml(md)))
}).listen(3000, () => console.log(`Listening on http://localhost:3000`))
