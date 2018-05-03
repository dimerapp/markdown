'use strict'

/*
 * dimer-markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const http = require('http')
const Markdown = require('../index')
const path = require('path')

http.createServer((req, res) => {
  const content = require('fs').readFileSync(path.join(__dirname, './index.md'), 'utf-8')
  new Markdown(content, {
    title: 'Hello word',
    cloudUrl: 'https://assets.dimerapp.com/site',
    onImage: function (url) {
      console.log('relative Url is ' + url)
    }})
    .toHTML()
    .then((file) => {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.write(`
        <head>
          <link rel="stylesheet" href="https://assets.dimerapp.com/themes/default/css/style.css?v=23" />
        </head>
        <body style="width: 770px; margin: auto; padding: 100px 0;">
          <div class="wysiwyg">
            ${file.toString()}
          </div>
        </body>
        <script src="https://assets.dimerapp.com/themes/default/js/app.js?v=23"></script>
      `)
      res.end()
    })
    .catch((error) => {
      res.writeHead(500, { 'content-type': 'application/json' })
      res.write(JSON.stringify(error))
      res.end()
    })
}).listen(3000)
