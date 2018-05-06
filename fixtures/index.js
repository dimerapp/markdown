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

const fixtures = [
  'paragraphs',
  'headings',
  'nested-list',
  'checkbox',
  'codeblocks',
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
  'toc-no-title'
]

module.exports = fixtures.reduce((result, name) => {
  result[name] = {
    in: fs.readFileSync(path.join(__dirname, name, 'index.md'), 'utf-8'),
    out: fs.readFileSync(path.join(__dirname, name, 'index.html'), 'utf-8')
  }
  return result
}, {})
