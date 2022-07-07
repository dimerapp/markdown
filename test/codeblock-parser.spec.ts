/*
 * @dimerapp/markdown
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import dedent from 'ts-dedent'
import { CodeBlockParser } from '../src/CodeBlockParser'

test.group('CodeBlock Parser', () => {
  test('parse contents without any highlights', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		a.run()
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: contents,
      inserts: [],
      highlights: [],
      deletes: [],
      marks: {},
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
      inserts: [],
      highlights: [2],
      deletes: [],
      marks: {},
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
      inserts: [],
      highlights: [2, 3],
      deletes: [],
      marks: {},
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
      inserts: [3],
      highlights: [2],
      deletes: [],
      marks: {},
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
      inserts: [],
      highlights: [2],
      deletes: [3],
      marks: {},
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
      inserts: [2, 3],
      highlights: [],
      deletes: [],
      marks: {},
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
      inserts: [],
      highlights: [2, 4],
      deletes: [],
      marks: {},
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
      inserts: [2, 4],
      highlights: [],
      deletes: [],
      marks: {},
    })
  })

  test('process marks inside highlights', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		// highlight-start
		a.{::run::}()
		// or call the following method
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
      inserts: [],
      highlights: [2, 3, 4],
      deletes: [],
      marks: {
        '2': [
          {
            start: 2,
            end: 5,
          },
        ],
      },
    })
  })

  test('process marks without highlights', ({ assert }) => {
    const contents = dedent`
		const a = require('a')
		a.{::run::}()
		// or call the following method
		a.walk()
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			const a = require('a')
			a.run()
			// or call the following method
			a.walk()
			`,
      inserts: [],
      highlights: [],
      deletes: [],
      marks: {
        '2': [
          {
            start: 2,
            end: 5,
          },
        ],
      },
    })
  })

  test('process multiple marks in a single file', ({ assert }) => {
    const contents = dedent`
		Route.get('{::/::}', ({::{ request }::}) => {
		})
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			Route.get('/', ({ request }) => {
			})
			`,
      inserts: [],
      highlights: [],
      deletes: [],
      marks: {
        '1': [
          {
            start: 11,
            end: 12,
          },
          {
            start: 16,
            end: 27,
          },
        ],
      },
    })
  })

  test('process marks at the end of line', ({ assert }) => {
    const contents = dedent`
		Route.get('{::/::}', ({::{ request }) => {::}
		})
		`

    assert.deepEqual(new CodeBlockParser().parse(contents), {
      content: dedent`
			Route.get('/', ({ request }) => {
			})
			`,
      inserts: [],
      highlights: [],
      deletes: [],
      marks: {
        '1': [
          {
            start: 11,
            end: 12,
          },
          {
            start: 16,
            end: 33,
          },
        ],
      },
    })
  })
})
