# Dimer markdown
> Opinionated markdown parser built on top of Remark.js

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

Dimer markdown is an opinionated markdown processor built on top of remark with the following features and goals.

> **Note**: This package is ESM only

- Generates [HAST](https://github.com/syntax-tree/hast) abstract syntax tree as the output. Later, you can use any template engine or a frontend framework to render HTML from the AST.
- Implements the markdown [directives proposal](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) to extend the markdown native capabilities.
- Introduces the concept of macros that builds up on top of directives.
- Selectively allow/dis-allow HTML inside Markdown.
- Register listeners to hook into the Markdown compilation phase.
- Ships with first-class support for parsing **frontmatter**.
- Automatically generates the **toc** for the markdown headings.
- Support for line highlights in code blocks.
- Pre-built macros to render code group tabs, embed videos, and show alert messages.

## Setup
Install the package from the npm registry as follows:

```sh
npm i @dimerapp/markdown

# yarn
yarn add @dimerapp/markdown
```

And import the package to process the markdown files.

```ts
import { MarkdownFile } from '@dimerapp/markdown'

const markdownContents = `
# Hello world

This is a markdown doc with GFM syntax.

- [ ] Todo 1
- [ ] Todo 2`

const md = new MarkdownFile(markdownContents)
const ast = await md.process()
```

## Generating HTML

We encourage you to render the AST to HTML using some template engine or a frontend framework like **Vue** or **React** to have better control over the rendered HTML.

However, if you want to keep things simple, you can use the following `toHTML` utility function to render HTML from AST.

```ts
import { MarkdownFile } from '@dimerapp/markdown'
import { toHtml } from '@dimerapp/markdown/utils'

const md = new MarkdownFile(contents)
await md.process()

const { contents, summary, toc, excerpt } = toHTML(md)
if (summary) {
  // render summary html
}

if (toc) {
  // render TOC html
}

if (excerpt) {
  // render excerpt text
}

// render content html
```

- `contents` is the HTML representation of the markdown file contents.
- `summary` is the HTML representation of the file summary. The summary HTML only exists when you have defined it inside the markdown content frontmatter.
- `toc` is the HTML representation of the table of contents. Available only when `generateToc` is set to `true`.
- `excerpt` is the plain text version of the summary. Available only when the summary is defined in the front matter.

## Options
You can pass the following options when creating a new instance of the `MarkdownFile`.

```ts
import { MarkdownFile } from '@dimerapp/markdown'

const md = new MarkdownFile(contents, {
  generateToc?: boolean
  allowHtml?: boolean
  filePath?: string
  enableDirectives?: boolean
})
```

- `generateToc`: Define whether you want to generate the table of contents or not. **Defaults to `false`**.
- `allowHtml`: Control whether you want to allow HTML inside Markdown or not. **Defaults to `false`**.
- `filePath`: Optionally, you can attach the absolute file path to the mdFile instance.
- `enableDirectives`: Enable support for the [directives proposal](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444). **Defaults to `false`**.

## Directives and macros
Dimer markdown ships with an implementation of [Markdown directives](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) to enhance the markdown syntax by adding rich components inside it.

For example, using the following syntax, you can embed a Youtube video inside the markdown.

```md
::youtube{id="Hm14pyibQhQ"}
```

By default, directives are converted to HTML tags. So, for example, the above `youtube` directive will be rendered as follows inside the HTML.

```html
<youtube id="Hm14pyibQhQ"></youtube>
```

This is not helpful because there is no native `youtube` HTML element to embed youtube videos.

However, you can define a custom `macro` that receives the AST of the `youtube` directive, and then you can manipulate that AST to render a different HTML output. For example:

```ts
import { MarkdownFile } from '@dimerapp/markdown'
const md = new MarkdownFile(contents, { enableDirectives: true })

md.macro('youtube', function (node, file, removeNode) {
  node.data = node.data || {}

  /**
   * Create a div with classes "embed" and "embed-youtube"
   *
   * The properties are defined in the HAST syntax tree
   * format.
   * https://github.com/syntax-tree/hast
   */
  node.data.hName = 'div'
  node.data.hProperties = {
    className: ['embed', 'embed-youtube']
  }

  const videoId = node.attributes.id
  const width = node.attributes.width
  const height = node.attributes.width

  /**
   * Add children nodes. We need an iframe and
   * the AST syntax tree must be in MDAST format.
   *
   * https://github.com/syntax-tree/mdast
   * https://github.com/syntax-tree/mdast-util-directive#syntax-tree
   */
  node.children = [
    {
      type: 'containerDirective',
      name: 'iframe',
      attributes: {
        src: `https://www.youtube.com/embed/${videoId}`,
        width: width || '100%',
        height: height || '400',
        frameborder: 'none',
        allow: 'autoplay; encrypted-media',
        allowfullscreen: 'true',
      },
      children: [],
    },
  ]
})
```

When you use the `youtube` directive, it will render the following HTML markup. So, the main goal of a macro is to take an AST node and mutate it.

```html
<div class="embed embed-youtube">
  <iframe
    src="https://www.youtube.com/embed/Hm14pyibQhQ"
    width="100%"
    height="400"
    frameborder="none"
    allow="autoplay; encrypted-media" allowfullscreen>
  </iframe>
</div>
```

### Macros props
You can access the props passed to a directive using the `node.attributes` property. For example:

```md
:::container{flex=true columns=3}
:::
```

```ts
md.macro('container', function (node) {
  // { flex: 'true', columns: '3' }
  console.log(node.attributes)
})
```

### Reporting errors from macros
Often, your macros will not receive the data it expects, so you would want to report errors to the markdown author.

You can report errors using the `file.report` method from within the macro.

```ts
md.macro('youtube', function (node, file, removeNode) {
  if (!node.attributes.id) {
    /**
     * Report error. Passing "node.position" is important
     * as it will allow us to report the error with the
     * exact line and column number.
     */
    file.report(
      '"youtube" macro needs the youtube video id',
      node.position
    )

    /**
     * Remove the node from the markdown since we are
     * not able to handle it
     */
    removeNode()
    return
  }
})
```

## Error messages
Every markdown file can have error messages associated with it. Usually, these errors are reported by the macros. However, you can report them manually as well.

```ts
import { MarkdownFile } from '@dimerapp/markdown'

const md = new MarkdownFile(contents)
await md.process()

if (!md.frontmatter.author) {
  md.report('Make sure to define the author for the markdown file')
}

for (let message of md.messages) {
  /**
   * Message is an instance of 
   * https://www.npmjs.com/package/vfile-message
   */
  console.log(message)
}
```

## Hooks
You can use hooks to observe or mutate the AST nodes as the markdown content is being processed.

The hook callback receives the AST syntax tree in [MDAST](https://github.com/syntax-tree/mdast) format.

> **Warning** Even though you can mutate the AST using hooks, we recommend not doing so and looking for alternative APIs. For example, you can use Macros to extend the markdown capabilities or use the rendering layer to render AST nodes differently.

In the following example, we will track all the to-do list items and keep a count of them.

```ts
import { mdastTypes } from '@dimerapp/markdown/types'
const md = new MarkdownFile(contents)

md.on('listItem', (node: mdastTypes.ListItem, file) => {
  /**
   * Not a todo list item
   */
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

// Access stored todo stats
console.log(md.stats.todo)
```

## Using remark plugins
You can use the [remark-plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) by calling the `use` method on the markdown file instance. The plugin API is the same as unified plugins.

```ts
import remarkCapitalize from 'remark-capitalize'

const md = new MarkdownFile(contents)
md.use(remarkCapitalize)

await md.process()
```

## Bundled macros

### codegroup
Render multiple codeblocks inside a group of tabs. The `macro` wraps all the codeblocks inside a `div` with `data-tabs` property.

```ts
import { MarkdownFile } from '@dimerapp/markdown'
import codegroup from '@dimerapp/markdown/macros/codegroup'

const md = new MarkdownFile(content)

/**
 * Codegroup function registers the macro
 * with the markdown file
 */
codegroup(md)
```

````md
:::codegroup

```ts
// title: Tab 1
```

```ts
// title: Tab 2
```

:::
````

Output AST

```ts
{
  tagName: 'div',
  properties: {
    dataTabs: '["Tab 1","Tab 2"]'
  }
  children: [/*Rest of the AST*/]
}
```

### codesandbox
Embed a codesandbox example. All of the [embed options](https://codesandbox.io/docs/embedding#embed-options) can be passed as props.

```ts
import { MarkdownFile } from '@dimerapp/markdown'
import codesandbox from '@dimerapp/markdown/macros/codesandbox'

const md = new MarkdownFile(content)

/**
 * Codesandbox function registers the macro
 * with the markdown file
 */
codesandbox(md)
```

```md
::codesandbox{url="https://codesandbox.io/s/github/adonisjs/adonis-starter-codesandbox/tree/master/?file=/server.js" autoresize=0 codemirror=1 fontsize=16}
```

### note
Render an alert message of type `note`. The content of the directive is wrapped inside a `div` with `alert alert-note` class names.

```ts
import { MarkdownFile } from '@dimerapp/markdown'
import note from '@dimerapp/markdown/macros/note'

const md = new MarkdownFile(content)

/**
 * note function registers the macro
 * with the markdown file
 */
note(md)
```

```md
:::note
This is a note
:::
```

### tip
Render an alert message of type `tip`. The content of the directive is wrapped inside a `div` with `alert alert-tip` class names.

```ts
import { MarkdownFile } from '@dimerapp/markdown'
import tip from '@dimerapp/markdown/macros/tip'

const md = new MarkdownFile(content)

/**
 * tip function registers the macro
 * with the markdown file
 */
tip(md)
```

```md
:::tip
This is a tip
:::
```

### warning
Render an alert message of type `warning`. The content of the directive is wrapped inside a `div` with `alert alert-warning` class names.

```ts
import { MarkdownFile } from '@dimerapp/markdown'
import warning from '@dimerapp/markdown/macros/warning'

const md = new MarkdownFile(content)

/**
 * warning function registers the macro
 * with the markdown file
 */
warning(md)
```

```md
:::warning
This is a warning
:::
```

### youtube
Embed a youtube video inside an iframe.

```ts
import { MarkdownFile } from '@dimerapp/markdown'
import youtube from '@dimerapp/markdown/macros/youtube'

const md = new MarkdownFile(content)

/**
 * youtube function registers the macro
 * with the markdown file
 */
youtube(md)
```

```md
::youtube{url="https://www.youtube.com/watch?v=Hm14pyibQhQ"}
```

Along with the URL, you can also pass the `width` and `height` of the video.

```md
::youtube{url="https://www.youtube.com/watch?v=Hm14pyibQhQ" width="1280" height="720"}
```

### video
Embed a video using the `video` HTML tag. The video tag is wrapped inside a div with `embed embed-video` class names.

```ts
import { MarkdownFile } from '@dimerapp/markdown'
import video from '@dimerapp/markdown/macros/video'

const md = new MarkdownFile(content)

/**
 * video function registers the macro
 * with the markdown file
 */
video(md)
```

```md
::video{url="./bunny.mp4"}
```

Along with the `url`, you can also pass the following props.

- `autoplay`
- `controls` 
- `loop`
- `preload`
- `poster`

## Enhanced markdown syntax

### Github flavored markdown
The [github flavored markdown](https://github.github.com/gfm/) is fully supported by default.

### Auto linking headings
All of the headings inside the markdown receives a unique id based upon the heading content. Also, all headings receives a little bookmark link next to them.

## Codeblock enhancements
Following is the AST node structure for the codeblock.

```ts
type CodeBlock = {
  type: 'code',
  lang: string,
  meta: {
    title: null | string
    highlights: number[]
    inserts: number[]
    deletes: number[]
  }  
}
```

- `lang`: The language is defined by writing the language abbreviation after the three backticks. In the following example, `ts` is the abbreviation for TypeScript.
  ````
  ```ts
  ```
  ````
- `meta.title`: The codeblock title defined using the `// title` comment.
- `meta.highlights`: An array of line numbers for the lines to be highlighted.
- `meta.inserts`: An array of line numbers to be highlighted as diff inserts.
- `meta.deletes`: An array of line numbers to be highlighted as diff deletes.

### Codeblock title
You can define the title for a codeblock by adding a comment in the first line.

```ts
// title: Routes file
Route.get('/', () => {})
```

The title will end up on the `meta` object of the codeblock AST node.

### Codeblock line highlights
You can highlight lines within the codeblocks using the `highlight-start` and `highlight-end` comments.

```js
// highlight-start
This line is highlighted
// highlight-end
```

### Codeblock line diffs
You can show **add** and **remove** line diffs using the `insert-start` and `delete-start` comments.

```ts
// delete-start
var foo = 'bar'
// delete-end
// insert-start
const foo = 'bar'
// insert-end
```

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/@dimerapp/markdown.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@dimerapp/markdown "npm"

[license-image]: https://img.shields.io/npm/l/@dimerapp/markdown?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[gh-workflow-image]: https://img.shields.io/github/workflow/status/dimerapp/markdown/test?style=for-the-badge
[gh-workflow-url]: https://github.com/dimerapp/markdown/actions/workflows/test.yml "Github action"
