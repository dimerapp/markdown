/*
 * @dimerapp/markdown
 *
 * (c) DimerApp
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { URL } from 'node:url'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'

import { template } from './template.js'
import { toHtml } from '../src/utils.js'
import { MarkdownFile } from '../index.js'
import * as macros from '../src/macros/index.js'

const mdFilePath = new URL('./sample.md', import.meta.url)
const routesImage = new URL('./routes.png', import.meta.url)
const mdContents = readFileSync(mdFilePath, 'utf-8')

createServer(async (req, res) => {
  if (req.url === '/routes.png') {
    res.writeHead(200, { 'content-type': 'image/png' })
    res.end(readFileSync(routesImage))
    return
  }

  const md = new MarkdownFile(mdContents, {
    filePath: mdFilePath.toString(),
    allowHtml: req.url?.includes('allowHtml=true'),
    enableDirectives: req.url?.includes('enableDirectives=true'),
    generateToc: true,
  })

  for (let macro of Object.values(macros)) {
    md.use(macro)
  }

  await md.process()
  res.writeHead(200, { 'content-type': 'text/html' })
  res.end(template(toHtml(md)))
}).listen(3000, () => console.log(`Listening on http://localhost:3000`))
