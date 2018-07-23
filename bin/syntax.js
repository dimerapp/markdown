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
const fixtures = require('../fixtures')
const beautifyHtml = require('js-beautify').html

const block = (name, inCode, outCode, jsonCode) => {
  return `<details>
<summary>${name}</summary>
<h3>Markdown</h3>

\`\`\`\`md
${inCode.trim()}
\`\`\`\`

<h3>Html</h3>

\`\`\`html
${beautifyHtml(outCode)}
\`\`\`

<h3>JSON</h3>
<pre><code>${JSON.stringify(jsonCode, null, 2)}</code></pre>

</details>`
}

let syntaxFile = '# Dimer syntax file \n'

for (let name in fixtures) {
  const fixture = fixtures[name]
  syntaxFile += `${block(name, fixture.in, fixture.out, fixture.json)}\n`
}

fs.writeFileSync(path.join(__dirname, '../syntax.md'), syntaxFile)
