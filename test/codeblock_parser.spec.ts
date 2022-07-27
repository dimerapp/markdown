/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { dedent } from 'ts-dedent'
import { test } from '@japa/runner'
import { CodeBlockParser } from '../src/codeblock_parser.js'

test.group('CodeBlock Parser', () => {
  test('parse contents without any highlights', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		a.run()
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: contents,
      title: null,
      inserts: [],
      highlights: [],
      deletes: [],
    })
  })

  test('parse codeblock title', ({ assert }) => {
    const contents = dedent`
    // title: foobar
    const a = require('a')
    a.run()
    `

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
      const a = require('a')
      a.run()
      `,
      title: 'foobar',
      inserts: [],
      highlights: [],
      deletes: [],
    })
  })

  test('parse contents with highlights', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		// highlight-start
		a.run()
		// highlight-end
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			const a = require('a')
			a.run()
			`,
      title: null,
      inserts: [],
      highlights: [2],
      deletes: [],
    })
  })

  test('parse contents with nested highlights', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		// highlight-start
		a.run()
		// highlight-start
		a.walk()
		// highlight-end
		// highlight-end
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			const a = require('a')
			a.run()
			a.walk()
			`,
      title: null,
      inserts: [],
      highlights: [2, 3],
      deletes: [],
    })
  })

  test('parse contents with inserts', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		// highlight-start
		a.run()
		// insert-start
		a.walk()
		// insert-end
		// highlight-end
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			const a = require('a')
			a.run()
			a.walk()
			`,
      title: null,
      inserts: [3],
      highlights: [2],
      deletes: [],
    })
  })

  test('parse contents with deletes', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		// highlight-start
		a.run()
		// delete-start
		a.walk()
		// delete-end
		// highlight-end
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			const a = require('a')
			a.run()
			a.walk()
			`,
      title: null,
      inserts: [],
      highlights: [2],
      deletes: [3],
    })
  })

  test('ignore deletes inside insert', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		// insert-start
		a.run()
		// delete-start
		a.walk()
		// delete-end
		// insert-end
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			const a = require('a')
			a.run()
			a.walk()
			`,
      title: null,
      inserts: [2, 3],
      highlights: [],
      deletes: [],
    })
  })

  test('parse contents with multiple highlights', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		// highlight-start
		a.run()
		// highlight-end
		// or call the following method
		// highlight-start
		a.walk()
		// highlight-end
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			const a = require('a')
			a.run()
			// or call the following method
			a.walk()
			`,
      title: null,
      inserts: [],
      highlights: [2, 4],
      deletes: [],
    })
  })

  test('parse contents with multiple inserts', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		// highlight-start
		// insert-start
		a.run()
		// insert-end
		// highlight-end
		// or call the following method
		// insert-start
		a.walk()
		// insert-end
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			const a = require('a')
			a.run()
			// or call the following method
			a.walk()
			`,
      title: null,
      inserts: [2, 4],
      highlights: [],
      deletes: [],
    })
  })
})
