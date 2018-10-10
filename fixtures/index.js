'use strict'

/*
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const path = require('path')
const fs = require('fs')
const vfile = require('vfile')

const fixtures = [
  'paragraphs',
  'headings',
  'nested-list',
  'checkbox',
  'codeblocks',
  'codeblocks-no-lang',
  'thematic-breaks',
  'blockquote',
  'simple-tables',
  'aligned-tables',
  'table-escaped-pipes',
  'codeblock-in-blockquote',
  'break-list',
  'inlines',
  'escaped-inlines',
  'macro-note',
  'macro-tip',
  'macro-warning',
  'nested-macros',
  'codepen',
  'codepen-custom-height',
  'codepen-missing-url',
  'youtube',
  'youtube-be-url',
  'youtube-missing-url',
  'youtube-invalid-url',
  'details',
  'details-missing-title',
  'codeblocks-linehighlights',
  'codeblocks-filename',
  'codegroup',
  'codegroup-with-names',
  'codegroup-one-block',
  'codegroup-empty',
  'codegroup-with-text',
  'toc',
  'toc-shifted-paragraph',
  'toc-missing-paragraph',
  'toc-no-title',
  'partials',
  'recursive-partials',
  'partials-bad-node',
  'partials-parent-bad-node',
  'partials-broken-ref',
  'partials-codeblock',
  'partials-codeblock-language',
  'partials-codeblock-linehighlight',
  'partials-codeblock-displayname',
  'partials-codeblock-codegroup'
]

module.exports = fixtures.reduce((result, name) => {
  let messages = null
  try {
    messages = JSON.parse(fs.readFileSync(path.join(__dirname, name, 'messages.json'), 'utf-8')).map((message) => {
      message.name = `${path.join(__dirname, name)}/${message.name}`
      message.file = `${path.join(__dirname, name)}/${message.file}`
      return message
    })
  } catch (error) {}

  result[name] = {
    in: vfile({
      path: path.join(__dirname, name, 'index.md'),
      contents: fs.readFileSync(path.join(__dirname, name, 'index.md'), 'utf-8')
    }),
    inJSON: vfile({
      path: path.join(__dirname, name, 'index.md'),
      contents: fs.readFileSync(path.join(__dirname, name, 'index.md'), 'utf-8')
    }),
    out: fs.readFileSync(path.join(__dirname, name, 'index.html'), 'utf-8'),
    json: JSON.parse(fs.readFileSync(path.join(__dirname, name, 'index.json'), 'utf-8')),
    messages: messages
  }
  return result
}, {})
