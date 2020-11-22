# The document contains the goals for this package

- Convert markdown to AST or HTML directly
- Allow adding custom macros
- Have file level stats. This includes
	- How many images + url
	- How many partial includes and so on.
	- But extendible too
- Allow hooks to act on certain elements and then modify them. For example:
	- onLink
	- onImage
	- Extendible
- Allow HTML
- Annotating elements like anchor tags, images, tables and so on
- Allow using remark plugins directly
	```
	![](){ width="" }

	[](){ target="_blank" }
	```

## Usage

```ts
const md = new Markdown()

md.on('image', (ast, stats, doc) => {
	if (!ast.url.startsWith('http')) {
		await file = 
		ast.url = 
		ast.thumbnail = 

		stats.originalUrl = ''
		stats.url = ''

		doc.stats.push('self-asset')
	}
})

md.macro('youtube', async (props, doc) => {
	const ast = {}
	const stats = {}

	doc.status.push(stats)
	await doc.processHooks('youtube', ast, stats)

	return ast
})
```

## Doc

```
{
	toc: {},
	stats: {},
	ast: {},
	raw: '',

	frontmatter: {},
	excerpt: {
		raw: '',
		html: {},
	}
}
```

## Stats object

```js
{
	assets: {
		remote: [
			{
				url: '',
				type: '',
			}
		],
		},
		local: [
			{
				url: '',
				type: '',
			}
		],
	},
	links: {
		remote: [],
		local: [],
	},
	children: [
		{
		}
	],
}
```


## API

```ts
const md = new Markdown('contents', options)
	.filePath('askjdjkasjdk')
	.allowHtml()
	.macro()
	.inlineMacro()
	.on()
	.parseFrontMatter()

await md.parseMarkdown()
await md.parse()
md.report() // vfile message
md.addAsset() // add asset
md.addChildren() // add children
md.addLink() // add link
md.stats.todos = md.stats.todos || 0
md.stats.todos++

md.state // pending | processed | processed-frontmatter
md.
```
