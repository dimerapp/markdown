'use strict'

/*
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const test = require('japa')
const dedent = require('dedent')
const { EOL } = require('os')

const Markdown = require('..')
const fixtures = require('../fixtures')

test.group('Markdown', () => {
  for (let name in fixtures) {
    const fixture = fixtures[name]

    test(`assert ${name}`, async (assert) => {
      const file = await new Markdown(fixture.in).toHTML()
      const jsonFile = await new Markdown(fixture.inJSON).toJSON()

      assert.equal(file.toString().trim().split(EOL).join('\n'), fixture.out.trim().split(EOL).join('\n'))
      assert.deepEqual(jsonFile.contents, fixture.json)

      if (fixture.messages) {
        assert.deepEqual(fixture.messages, file.messages.map((message) => {
          return {
            name: message.name,
            reason: message.reason,
            line: message.line,
            column: message.column,
            ruleId: message.ruleId,
            fatal: message.fatal,
            message: message.message,
            location: message.location,
            file: message.file,
            source: message.source
          }
        }))
      }
    })
  }

  test('replace relative image url with the result of callback url', async (assert) => {
    const markdown = dedent`
    Hello

    ![](../foo/bar)
    `
    const html = '<p>Hello</p><p><img src="https://assets.dimerapp.com/edge/foo/bar"></p>'

    const md = new Markdown(markdown, {
      onUrl: async function (relativeUrl) {
        return {
          url: relativeUrl.replace('../', 'https://assets.dimerapp.com/edge/')
        }
      }
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('replace relative anchor url with the result of callback url', async (assert) => {
    const markdown = dedent`
    Hello

    [![](../foo/bar)](../foo/bar)
    `
    const html = '<p>Hello</p><p><a href="https://assets.dimerapp.com/edge/foo/bar"><img src="https://assets.dimerapp.com/edge/foo/bar"></a></p>'

    const md = new Markdown(markdown, {
      onUrl: async function (relativeUrl) {
        return {
          url: relativeUrl.replace('../', 'https://assets.dimerapp.com/edge/')
        }
      }
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('ignore when image url is empty', async (assert) => {
    const markdown = dedent`
    Hello

    ![]()
    `
    const html = '<p>Hello</p><p><img src=""></p>'

    const md = new Markdown(markdown, {
      onUrl: async function () {}
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('ignore when image url is absolute', async (assert) => {
    const markdown = dedent`
    Hello

    ![](https://foo.com)
    `
    const html = '<p>Hello</p><p><img src="https://foo.com"></p>'

    const md = new Markdown(markdown, {
      onUrl: async function () {}
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('work fine when using reference urls', async (assert) => {
    const markdown = dedent`
    Hello

    ![][logo]

    [logo]:../images/logo.png
    `
    const html = '<p>Hello</p><p><img src="https://assets.dimerapp.com/edge/images/logo.png"></p>'

    const md = new Markdown(markdown, {
      onUrl: async function (relativeUrl) {
        return {
          url: relativeUrl.replace('../', 'https://assets.dimerapp.com/edge/')
        }
      }
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('replace relative anchor url when using reference urls', async (assert) => {
    const markdown = dedent`
    Hello

    [![][logo]][logo]

    [logo]:../images/logo.png
    `

    const html = '<p>Hello</p><p><a href="https://assets.dimerapp.com/edge/images/logo.png"><img src="https://assets.dimerapp.com/edge/images/logo.png"></a></p>'

    const md = new Markdown(markdown, {
      onUrl: async function (relativeUrl) {
        return {
          url: relativeUrl.replace('../', 'https://assets.dimerapp.com/edge/')
        }
      }
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('call onUrl callback with the relative path', async (assert) => {
    assert.plan(1)

    const markdown = dedent`
    ![](../foo.jpg)
    `

    const md = new Markdown(markdown, {
      onUrl: async function (url) {
        assert.equal(url, '../foo.jpg')
      }
    })

    await md.toHTML()
  })

  test('use h1 as dimertitle', async (assert) => {
    const markdown = dedent`
    # Hello
    `
    const html = '<dimertitle>Hello</dimertitle><h1 id="hello"><a href="#hello" aria-hidden><span class="icon icon-link"></span></a>Hello</h1>'

    const md = new Markdown(markdown)

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('use h1 as dimertitle when it is an anchor too', async (assert) => {
    const markdown = dedent`
    # [Hello](#hello)
    `
    const html = '<dimertitle>Hello</dimertitle><h1 id="hello"><a href="#hello" aria-hidden><span class="icon icon-link"></span></a><a href="#hello">Hello</a></h1>'

    const md = new Markdown(markdown)

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('set title from metaData title', async (assert) => {
    const markdown = dedent`
    `
    const html = '<dimertitle>Hello</dimertitle><h1 id="hello"><a href="#hello" aria-hidden><span class="icon icon-link"></span></a>Hello</h1>'

    const md = new Markdown(markdown, { title: 'Hello' })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('set title from metaData when processing parellely', async (assert) => {
    const markdown = dedent`
    `

    const markdown1 = dedent`
    `

    const html = '<dimertitle>Hello</dimertitle><h1 id="hello"><a href="#hello" aria-hidden><span class="icon icon-link"></span></a>Hello</h1>'

    const html1 = '<dimertitle>Hi</dimertitle><h1 id="hi"><a href="#hi" aria-hidden><span class="icon icon-link"></span></a>Hi</h1>'

    const md = new Markdown(markdown, { title: 'Hello' })
    const md1 = new Markdown(markdown1, { title: 'Hi' })

    const files = await Promise.all([md.toHTML(), md1.toHTML()])
    assert.equal(files[0].toString().trim(), html)
    assert.equal(files[1].toString().trim(), html1)
  })

  test('return error when youtube url is valid but querystring is not defined', async (assert) => {
    const markdown = dedent`
    [youtube url="https://www.youtube.com/watch"]
    `

    const html = dedent`<div>define valid youtube video url</div>`

    const md = new Markdown(markdown)

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('return error when youtube url is valid but link is not defined', async (assert) => {
    const markdown = dedent`
    [youtube url="https://www.youtube.com/watch?v="]
    `

    const html = dedent`<div>define valid youtube video url</div>`

    const md = new Markdown(markdown)

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('work fine with mutiple images', async (assert) => {
    const markdown = dedent`
    Hello

    ![][logo]

    Hello dude

    ![](../bar.jpg)

    [logo]: ../foo.jpg
    `
    const html = '<p>Hello</p><p><img src="https://assets.dimerapp.com/edge/foo.jpg"></p><p>Hello dude</p><p><img src="https://assets.dimerapp.com/edge/bar.jpg"></p>'

    const md = new Markdown(markdown, {
      onUrl: async function (relativeUrl) {
        return {
          url: relativeUrl.replace('../', 'https://assets.dimerapp.com/edge/')
        }
      }
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('add toc when title is added as yaml front matter', async (assert) => {
    const markdown = dedent`
    I expect toc after this paragraph

    ## This is heading2

    ## This is header 2 again
    `
    const html = '<dimertitle>This is a title</dimertitle><h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden><span class="icon icon-link"></span></a>This is a title</h1><p>I expect toc after this paragraph</p><div class="toc-container"><h2>Table of contents</h2><ul><li><a href="#this-is-heading2">This is heading2</a></li><li><a href="#this-is-header-2-again">This is header 2 again</a></li></ul></div><h2 id="this-is-heading2"><a href="#this-is-heading2" aria-hidden><span class="icon icon-link"></span></a>This is heading2</h2><h2 id="this-is-header-2-again"><a href="#this-is-header-2-again" aria-hidden><span class="icon icon-link"></span></a>This is header 2 again</h2>'

    const md = new Markdown(markdown, { title: 'This is a title' })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('skip toc when there are no h2', async (assert) => {
    const markdown = dedent`
    # This is a title

    I expect toc after this paragraph
    `
    const html = '<dimertitle>This is a title</dimertitle><h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden><span class="icon icon-link"></span></a>This is a title</h1><p>I expect toc after this paragraph</p>'

    const md = new Markdown(markdown, { title: 'This is a title' })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('do not add toc when skip toc is true', async (assert) => {
    const markdown = dedent`
    I expect toc after this paragraph

    ## This is heading2

    ## This is header 2 again
    `
    const html = '<dimertitle>This is a title</dimertitle><h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden><span class="icon icon-link"></span></a>This is a title</h1><p>I expect toc after this paragraph</p><h2 id="this-is-heading2"><a href="#this-is-heading2" aria-hidden><span class="icon icon-link"></span></a>This is heading2</h2><h2 id="this-is-header-2-again"><a href="#this-is-header-2-again" aria-hidden><span class="icon icon-link"></span></a>This is header 2 again</h2>'

    const md = new Markdown(markdown, { title: 'This is a title', skipToc: true })
    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('set image node props', async (assert) => {
    const markdown = dedent`
    Hello

    ![](../foo/bar)
    `
    const html = '<p>Hello</p><p><img src="https://assets.dimerapp.com/edge/foo/bar" data-src="https://assets.dimerapp.com/edge/foo/bar"></p>'

    const md = new Markdown(markdown, {
      onUrl: async function (relativeUrl) {
        return {
          url: relativeUrl.replace('../', 'https://assets.dimerapp.com/edge/'),
          data: {
            hProperties: {
              dataSrc: relativeUrl.replace('../', 'https://assets.dimerapp.com/edge/')
            }
          }
        }
      }
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('pass file reference to onUrl callback', async (assert) => {
    assert.plan(1)

    const markdown = dedent`
    Hello

    ![](../foo/bar)
    `

    const md = new Markdown(markdown, {
      onUrl: async function (relativeUrl, file) {
        assert.deepEqual(md, file)
      }
    })

    await md.toHTML()
  })

  test('add custom macro to the class', async (assert) => {
    const markdown = dedent`
    [button text="I am a button"]
    `

    Markdown.addMacro('button', function (props) {
      return {
        type: 'ButtonNode',
        data: {
          hName: 'button',
          hProperties: {
            className: ['button']
          }
        },
        children: [{
          type: 'text',
          value: props.text
        }]
      }
    }, true)

    const md = new Markdown(markdown, {})
    const html = await md.toHTML()
    assert.equal(html.contents, '<button class="button">I am a button</button>')
  })
})
