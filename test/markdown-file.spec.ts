/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import dedent from 'ts-dedent'
import visit from 'unist-util-visit'
import { mdastTypes } from '../src/Contracts'
import { MarkdownFile } from '../src/MarkdownFile'

test.group('Markdown', () => {
  test('process markdown to ast', async (assert) => {
    const contents = dedent`
		Hello world. This is **markdown**
		`

    const md = new MarkdownFile(contents)
    await md.process()

    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello world. This is ',
            },
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'markdown',
                },
              ],
            },
          ],
        },
      ],
    })
  })

  test('process markdown to ast with gfm syntax', async (assert) => {
    const contents = dedent`
		www.example.com

		~one~
		`

    const md = new MarkdownFile(contents)
    await md.process()

    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'element',
              tagName: 'a',
              properties: {
                href: 'http://www.example.com',
              },
              children: [
                {
                  type: 'text',
                  value: 'www.example.com',
                },
              ],
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'element',
              properties: {},
              tagName: 'del',
              children: [
                {
                  type: 'text',
                  value: 'one',
                },
              ],
            },
          ],
        },
      ],
    })
  })

  test('generate bookmarks for headings', async (assert) => {
    const contents = dedent`
		## Hello world
		Some text for fun

		### Hello nested world
		`

    const md = new MarkdownFile(contents)
    await md.process()

    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'h2',
          properties: {
            id: 'hello-world',
          },
          children: [
            {
              type: 'element',
              tagName: 'a',
              properties: {
                ariaHidden: 'true',
                href: '#hello-world',
                tabIndex: -1,
              },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    className: ['icon', 'icon-link'],
                  },
                  children: [],
                },
              ],
            },
            {
              type: 'text',
              value: 'Hello world',
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Some text for fun',
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'h3',
          properties: {
            id: 'hello-nested-world',
          },
          children: [
            {
              type: 'element',
              tagName: 'a',
              properties: {
                ariaHidden: 'true',
                href: '#hello-nested-world',
                tabIndex: -1,
              },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    className: ['icon', 'icon-link'],
                  },
                  children: [],
                },
              ],
            },
            {
              type: 'text',
              value: 'Hello nested world',
            },
          ],
        },
      ],
    })
  })

  test('ignore directives unless enabled', async (assert) => {
    const contents = dedent`
		Hello :span[**hello**]{class="grey"}

		:::div{class="block"}
		Some content
		:::
		`

    const md = new MarkdownFile(contents)
    await md.process()

    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello :span[',
            },
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'hello',
                },
              ],
            },
            {
              type: 'text',
              value: ']{class="grey"}',
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: ':::div{class="block"}\nSome content\n:::',
            },
          ],
        },
      ],
    })
  })

  test('allow markdown directives when enabled', async (assert) => {
    const contents = dedent`
		Hello :span[**hello**]{class="grey"}

		:::div{class="block"}
		Some content
		:::
		`

    const md = new MarkdownFile(contents, { enableDirectives: true })
    await md.process()

    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello ',
            },
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['grey'],
              },
              children: [
                {
                  type: 'element',
                  tagName: 'strong',
                  properties: {},
                  children: [
                    {
                      type: 'text',
                      value: 'hello',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['block'],
          },
          children: [
            {
              type: 'element',
              properties: {},
              tagName: 'p',
              children: [
                {
                  type: 'text',
                  value: 'Some content',
                },
              ],
            },
          ],
        },
      ],
    })
  })
})

test.group('Markdown html', () => {
  test('ignore html', async (assert) => {
    const contents = dedent`
		Hello world

		<p> Hi world </p>
		`

    const md = new MarkdownFile(contents, { enableDirectives: true })
    await md.process()

    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello world',
            },
          ],
        },
      ],
    })
  })

  test('allow html when enabled', async (assert) => {
    const contents = dedent`
		Hello world

		<p> Hi world </p>
		`

    const md = new MarkdownFile(contents, { allowHtml: true })
    await md.process()

    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello world',
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: ' Hi world ',
            },
          ],
        },
      ],
      data: {
        quirksMode: false,
      },
    })
  })
})

test.group('Markdown frontmatter', () => {
  test('process front matter', async (assert) => {
    const contents = dedent`
		---
		title: Hello world
		permalink: /hello-world
		summary: Hello **world**
		---
		Hello world. This is **markdown**
		`

    const md = new MarkdownFile(contents)
    assert.deepEqual(md.frontmatter, {
      permalink: '/hello-world',
      summary: 'Hello **world**',
      title: 'Hello world',
    })
  })

  test('process summary markdown to ast', async (assert) => {
    const contents = dedent`
		---
		title: Hello world
		permalink: /hello-world
		summary: Hello **world**
		---
		Hello world. This is **markdown**
		`

    const md = new MarkdownFile(contents)
    assert.deepEqual(md.frontmatter, {
      permalink: '/hello-world',
      summary: 'Hello **world**',
      title: 'Hello world',
    })

    const ast = await md.process()

    assert.deepEqual(ast, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello world. This is ',
            },
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'markdown',
                },
              ],
            },
          ],
        },
      ],
    })

    assert.deepEqual(md.excerpt, 'Hello world')
    assert.deepEqual(md.summary!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello ',
            },
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'world',
                },
              ],
            },
          ],
        },
      ],
    })
  })

  test('allow html in summary when enabled', async (assert) => {
    const contents = dedent`
		---
		title: Hello world
		permalink: /hello-world
		summary: Hello <strong>world</strong>
		---
		Hello world. This is **markdown**
		`

    const md = new MarkdownFile(contents, { allowHtml: true })
    assert.deepEqual(md.frontmatter, {
      permalink: '/hello-world',
      summary: 'Hello <strong>world</strong>',
      title: 'Hello world',
    })

    const ast = await md.process()
    assert.deepEqual(ast, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello world. This is ',
            },
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'markdown',
                },
              ],
            },
          ],
        },
      ],
      data: {
        quirksMode: false,
      },
    })

    assert.deepEqual(md.excerpt, 'Hello world')
    assert.deepEqual(md.summary!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello ',
            },
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'world',
                },
              ],
            },
          ],
        },
      ],
      data: {
        quirksMode: false,
      },
    })
  })

  test('do not process directives inside summary', async (assert) => {
    const contents = dedent`
		---
		title: Hello world
		permalink: /hello-world
		summary: Hello :strong[world]
		---
		Hello world. This is :strong[markdown]
		`

    const md = new MarkdownFile(contents, { enableDirectives: true })
    assert.deepEqual(md.frontmatter, {
      permalink: '/hello-world',
      summary: 'Hello :strong[world]',
      title: 'Hello world',
    })

    const ast = await md.process()

    assert.deepEqual(ast, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello world. This is ',
            },
            {
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'markdown',
                },
              ],
            },
          ],
        },
      ],
    })

    assert.deepEqual(md.excerpt, 'Hello :strong[world]')
    assert.deepEqual(md.summary!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello :strong[world]',
            },
          ],
        },
      ],
    })
  })
})

test.group('Markdown macros', () => {
  test('allow defining custom macros', async (assert) => {
    const contents = dedent`
		Hello world

		:::note
		This is a note
		:::
		`

    const md = new MarkdownFile(contents, { enableDirectives: true })
    md.macro('note', (ast) => {
      ast.data = ast.data || {}
      ast.data.hName = 'div'
      ast.data.hProperties = {
        className: ['alert', 'alert-note'],
      }
    })

    await md.process()

    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello world',
            },
          ],
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['alert', 'alert-note'],
          },
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'This is a note',
                },
              ],
            },
          ],
        },
      ],
    })
  })

  test('allow macros to report errors', async (assert) => {
    const contents = dedent`
		Hello world

		:::note
		This is a note
		:::
		`

    const md = new MarkdownFile(contents, { enableDirectives: true })
    md.macro('note', (ast, file) => {
      file.report('Invalid note class', ast.position)
    })

    await md.process()

    assert.lengthOf(md.messages, 1)
    assert.equal(md.messages[0].reason, 'Invalid note class')
    assert.equal(md.messages[0].line, 3)
    assert.equal(md.messages[0].column, 1)
  })

  test('ensure correct line + column when yaml front matter is used', async (assert) => {
    const contents = dedent`
		---
		title: Hello world
		summary: Some summary
		---

		Hello world

		:::note
		This is a note
		:::
		`

    const md = new MarkdownFile(contents, { enableDirectives: true })
    md.macro('note', (ast, file) => {
      file.report('Invalid note class', ast.position)
    })

    await md.process()

    assert.lengthOf(md.messages, 1)
    assert.equal(md.messages[0].reason, 'Invalid note class')
    assert.equal(md.messages[0].line, 8)
    assert.equal(md.messages[0].column, 1)
  })

  test('allow macro to remove node all together', async (assert) => {
    const contents = dedent`
		---
		title: Hello world
		summary: Some summary
		---

		Hello world

		:::note
		This is a note
		:::
		`

    const md = new MarkdownFile(contents, { enableDirectives: true })
    md.macro('note', (_, __, removeNode) => {
      removeNode()
    })

    await md.process()
    assert.deepEqual(md.ast!, {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'Hello world',
            },
          ],
        },
      ],
    })
  })

  test('forward exceptions raised by macros', async (assert) => {
    assert.plan(1)

    const contents = dedent`
		---
		title: Hello world
		summary: Some summary
		---

		Hello world

		:::note
		This is a note
		:::
		`

    const md = new MarkdownFile(contents, { enableDirectives: true })
    md.macro('note', () => {
      throw new Error('what??')
    })

    try {
      await md.process()
    } catch (error) {
      assert.equal(error.message, 'what??')
    }
  })
})

test.group('Markdown assets', () => {
  test('collect images from the markdown document', async (assert) => {
    const contents = dedent`
		Hello world. I link to [google](http://google.com)

		And also have this image ![](foo.jpg)
		`

    const md = new MarkdownFile(contents, { collectAssets: true })
    await md.process()

    assert.deepEqual(md.stats, {
      assets: [
        {
          type: 'image',
          originalUrl: 'foo.jpg',
          url: 'foo.jpg',
          isRelative: true,
          isLocal: true,
        },
      ],
    })
  })

  test('do not collect links when "collectAssets" is not true', async (assert) => {
    const contents = dedent`
		Hello world. I link to [google](http://google.com)

		And also have this image ![](foo.jpg)
		`

    const md = new MarkdownFile(contents, {})
    await md.process()

    assert.deepEqual(md.stats, {
      assets: [],
    })
  })
})

test.group('Markdown hooks', () => {
  test('allow hooking into nodes', async (assert) => {
    const contents = dedent`
		The tasks are

		- [ ] Task 1
		- [x] Task 2
		- [ ] Task 3
		- [x] Task 4
		`

    const md = new MarkdownFile(contents, { collectAssets: true })
    md.on('listItem', (node: mdastTypes.ListItem, file) => {
      assert.equal(node.type, 'listItem')
      if (node.checked === null) {
        return
      }

      file.stats.todo = file.stats.todo || { total: 0, completed: 0 }
      file.stats.todo.total++

      if (node.checked === true) {
        file.stats.todo.completed++
      }
    })

    await md.process()

    assert.deepEqual(md.stats.todo, {
      total: 4,
      completed: 2,
    })
  })

  test('allow multiple handlers for a given node', async (assert) => {
    const contents = dedent`
		The tasks are

		- [ ] Task 1
		- [x] Task 2
		- [ ] Task 3
		- [x] Task 4

		And some standard list items

		- Hello
		- world
		`

    const md = new MarkdownFile(contents, { collectAssets: true })
    md.on('listItem', (node: mdastTypes.ListItem, file) => {
      assert.equal(node.type, 'listItem')
      if (node.checked === null) {
        return
      }

      file.stats.todo = file.stats.todo || { total: 0, completed: 0 }
      file.stats.todo.total++

      if (node.checked === true) {
        file.stats.todo.completed++
      }
    })

    md.on('listItem', (node: mdastTypes.ListItem, file) => {
      assert.equal(node.type, 'listItem')
      file.stats.listItems = file.stats.listItems || 0
      file.stats.listItems++
    })

    await md.process()

    assert.deepEqual(md.stats.todo, {
      total: 4,
      completed: 2,
    })
    assert.deepEqual(md.stats.listItems, 6)
  })

  test('allow match test as a function', async (assert) => {
    const contents = dedent`
		The tasks are

		- [ ] Task 1
		- [x] Task 2
		- [ ] Task 3
		- [x] Task 4

		And some standard list items

		- Hello
		- world
		`

    const md = new MarkdownFile(contents, { collectAssets: true })
    md.on(
      (node) => {
        return node.type === 'listItem' && node.checked !== null
      },
      (node: mdastTypes.ListItem, file) => {
        assert.equal(node.type, 'listItem')

        file.stats.todo = file.stats.todo || { total: 0, completed: 0 }
        file.stats.todo.total++

        if (node.checked === true) {
          file.stats.todo.completed++
        }
      }
    )

    md.on(
      (node) => {
        return node.type === 'listItem'
      },
      (node: mdastTypes.ListItem, file) => {
        assert.equal(node.type, 'listItem')
        file.stats.listItems = file.stats.listItems || 0
        file.stats.listItems++
      }
    )

    await md.process()

    assert.deepEqual(md.stats.todo, {
      total: 4,
      completed: 2,
    })
    assert.deepEqual(md.stats.listItems, 6)
  })
})

test.group('Markdown transform plugin', () => {
  test('define unified mdast plugin', async (assert) => {
    assert.plan(2)

    const contents = dedent`
		The tasks are

		- [ ] Task 1
		- [x] Task 2
		- [ ] Task 3
		- [x] Task 4
		`

    const md = new MarkdownFile(contents, { collectAssets: true })
    md.transform(
      function (options) {
        assert.deepEqual(options.md, md)
        return async function (node) {
          assert.equal(node.type, 'root')
        }
      },
      { md }
    )

    await md.process()
  })
})

test.group('Markdown toc', () => {
  test('generate toc when enabled', async (assert) => {
    const contents = dedent`
		# Hello
		hello

		## Hello world

		### Hello nested world
		`

    const md = new MarkdownFile(contents, { generateToc: true })
    await md.process()

    assert.equal(md.toc?.tagName, 'ul')
  })
})

test.group('Markdown code', () => {
  test('parse thematic block', async (assert) => {
    assert.plan(1)
    const contents = ['Hello', '```js', `const a = require('a')`, '```'].join('\n')

    const md = new MarkdownFile(contents, { generateToc: true })
    md.transform(() => {
      return function (tree) {
        visit(tree, 'code', (node) => {
          assert.deepEqual(node.lang, 'js')
        })
      }
    })

    await md.process()
  })

  test('parse thematic block with line highlights', async (assert) => {
    assert.plan(2)
    const contents = [
      'Hello',
      '```js',
      `const a = require('a')`,
      '// highlight-start',
      'a.run()',
      '// highlight-end',
      '```',
    ].join('\n')

    const md = new MarkdownFile(contents, { generateToc: true })
    md.transform(() => {
      return function (tree) {
        visit(tree, 'code', (node) => {
          assert.deepEqual(node.lang, 'js')
          assert.deepEqual(node.meta, {
            lang: 'js',
            highlights: [2],
            inserts: [],
            deletes: [],
            marks: {},
            fileName: null,
          })
        })
      }
    })

    await md.process()
  })

  test('parse thematic block with filename', async (assert) => {
    assert.plan(2)
    const contents = ['Hello', '```js{hello.ts}', `const a = require('a')`, '```'].join('\n')

    const md = new MarkdownFile(contents, { generateToc: true })
    md.transform(() => {
      return function (tree) {
        visit(tree, 'code', (node) => {
          assert.deepEqual(node.lang, 'js')
          assert.deepEqual(node.meta, {
            lang: 'js',
            highlights: [],
            inserts: [],
            deletes: [],
            marks: {},
            fileName: 'hello.ts',
          })
        })
      }
    })

    await md.process()
  })

  test('parse thematic block without language', async (assert) => {
    assert.plan(2)
    const contents = ['Hello', '```', `const a = require('a')`, '```'].join('\n')

    const md = new MarkdownFile(contents, { generateToc: true })
    md.transform(() => {
      return function (tree) {
        visit(tree, 'code', (node) => {
          assert.isNull(node.lang)
          assert.deepEqual(node.meta, {
            lang: null,
            highlights: [],
            inserts: [],
            deletes: [],
            marks: {},
            fileName: null,
          })
        })
      }
    })

    await md.process()
  })
})
