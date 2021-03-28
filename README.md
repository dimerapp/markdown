<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Markdown processor](#markdown-processor)
  - [Setup](#setup)
  - [Generating HTML](#generating-html)
  - [Options](#options)
  - [Use cases](#use-cases)
    - [User land features](#user-land-features)
    - [Use Vue as the rendering layer](#use-vue-as-the-rendering-layer)
    - [Validate cross referenced links](#validate-cross-referenced-links)
    - [Collect todos in a document](#collect-todos-in-a-document)
  - [Macros](#macros)
    - [Existing](#existing)
    - [Adding your own](#adding-your-own)
  - [Plugins](#plugins)
    - [Shiki](#shiki)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Markdown processor
> An improved markdown processor built on top of remark

[![circleci-image]][circleci-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url] [![synk-image]][synk-url]

Dimer markdown is an opinionated markdown processor built on top of remark with following features and goals.

- Implements the markdown [directives proposal](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) to extend the markdown native capabilities
- Introduces the concept of macros that builds up on top of directives
- Selectively allow/dis-allow HTML inside Markdown
- Register listeners to hook into Markdown compilation phase
- First class support for **frontmatter**, generating **toc** and **excerpt** from the doc summary

## Setup
Install the package from npm registry as follows:

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

This is a markdown doc with some GFM syntax

- [ ] Todo 1
- [ ] Todo 2`

const md = new MarkdownFile(markdownContents)
const ast = await md.process()
```

## Generating HTML

The package encourages using AST vs directly generating the HTML from the markdown. Using AST let you bring your own frontend layer. It is like creating a JSON API and then using **Vue** or **React** to create webpages.

However, if also ship with a helper function to convert the markdown file instance to HTML.

```ts
import { MarkdownFile, toHTML } from '@dimerapp/markdown'

const md = new MarkdownFile(contents)
await md.process()

const { contents, summary, toc, excerpt } = toHTML(md)
```

- `contents` is the HTML representation of the markdown file contents
- `summary` is the HTML representation of the file summary. You can also define summary using frontmatter.
- `toc` is the HTML representation of the table of contents. Available only when `generateToc` option was used.
- `excerpt` is the plain text version of summary. Helpful for SEO

## Options
You can pass the following options when creating a new instance of the `MarkdownFile`.

```ts
import { MarkdownFile } from '@dimerapp/markdown'

const md = new MarkdownFile(contents, {
  generateToc?: boolean
  allowHtml?: boolean
  filePath?: string
  enableDirectives?: boolean
  collectAssets?: boolean
})
```

- `generateToc`: Define whether you want to generate the table of contents or not. **Defaults to `false`**.
- `allowHtml`: Control whether you want to allow HTML inside Markdown or not. **Defaults to `false`**.
- `filePath`: Optionally you can attach the absolute file path to the mdFile instance.
- `enableDirectives`: Enable support for the [directives proposal](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444). **Defaults to `false`**.
- `collectAssets`: Decide if you want us to collect the asset links referenced inside your markdown file. Currently image links are only collected.

## Use cases
Lets go over all the use cases that this package can serve

### User land features
TBD

### Use Vue as the rendering layer
TBD

### Validate cross referenced links
TBD

### Collect todos in a document
TBD

## Macros

### Existing

### Adding your own

## Plugins

### Shiki
TBD

[circleci-image]: https://img.shields.io/circleci/project/github/dimerapp/markdown/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/dimerapp/markdown "circleci"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/@dimerapp/markdown.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@dimerapp/markdown "npm"

[license-image]: https://img.shields.io/npm/l/@dimerapp/markdown?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[synk-image]: https://img.shields.io/snyk/vulnerabilities/github/dimerapp/markdown?label=Synk%20Vulnerabilities&style=for-the-badge
[synk-url]: https://snyk.io/test/github/dimerapp/markdown?targetFile=package.json "synk"
