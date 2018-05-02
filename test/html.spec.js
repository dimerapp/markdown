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

const Markdown = require('..')
const fixtures = require('../fixtures')

test.group('Markdown', () => {
  for (let name in fixtures) {
    const fixture = fixtures[name]
    test(`assert ${name}`, async (assert) => {
      const md = new Markdown(fixture.in)
      const file = await md.toHTML()
      assert.equal(file.toString(), fixture.out)
    })
  }

  test('replace relative image url with the cloudUrl', async (assert) => {
    const markdown = dedent`
    Hello

    ![](../foo/bar)
    `
    const html = dedent`
    <p>Hello</p>
    <p><img src="https://assets.dimerapp.com/edge/foo/bar"></p>
    `

    const md = new Markdown(markdown, {
      cloudUrl: 'https://assets.dimerapp.com/edge',
      onImage: function () {}
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('ignore when image url is empty', async (assert) => {
    const markdown = dedent`
    Hello

    ![]()
    `
    const html = dedent`
    <p>Hello</p>
    <p><img src=""></p>
    `

    const md = new Markdown(markdown, {
      cloudUrl: 'https://assets.dimerapp.com/edge',
      onImage: function () {}
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('ignore when image url is absolute', async (assert) => {
    const markdown = dedent`
    Hello

    ![](https://foo.com)
    `
    const html = dedent`
    <p>Hello</p>
    <p><img src="https://foo.com"></p>
    `

    const md = new Markdown(markdown, {
      cloudUrl: 'https://assets.dimerapp.com/edge',
      onImage: function () {}
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
    const html = dedent`
    <p>Hello</p>
    <p><img src="https://assets.dimerapp.com/edge/images/logo.png"></p>
    `

    const md = new Markdown(markdown, {
      cloudUrl: 'https://assets.dimerapp.com/edge',
      onImage: function () {}
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })

  test('work fine when reference urls are empty', async (assert) => {
    const markdown = dedent`
    Hello

    ![][logo]

    [logo]:
    `
    const html = dedent`
    <p>Hello</p>
    <p><img src=""></p>
    <p>[logo]:</p>
    `

    const md = new Markdown(markdown, {
      cloudUrl: 'https://assets.dimerapp.com/edge',
      onImage: function () {}
    })

    const file = await md.toHTML()
    assert.equal(file.toString().trim(), html)
  })
})
