'use strict'

/*
 * dimer-markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const Markdown = require('../index')
const path = require('path')
const vfile = require('vfile')

const file = vfile({
  path: path.join(__dirname, './index.md'),
  contents: require('fs').readFileSync(path.join(__dirname, './index.md'), 'utf-8')
})

new Markdown(file, {
  title: 'Hello word',
  cloudUrl: 'https://assets.dimerapp.com/site',
  onImage: function (url) {
    console.log('relative Url is ' + url)
  }
})
  .toHTML()
  .then((file) => {
    console.log(file.contents)
  })
  .catch(console.log)
