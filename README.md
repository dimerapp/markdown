<div align="center">
  <div>
    <img width="500" src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1532274184/Dimer_Readme_Banner_lyy7wv.svg" alt="Dimer App">
  </div>
  <br>
  <p>
    <a href="https://dimerapp.com/what-is-dimer">
      Dimer is an open source project and CMS to help you publish your documentation online.
    </a>
  </p>
  <br>
  <p>
    <sub>We believe every project/product is incomplete without documentation. <br /> We want to help you publish user facing documentation, without worrying <code>about tools or code</code> to write.</sub>
  </p>
  <br>
</div>

## Dimer markdown
> The meat of Dimer

This repo has the code to convert **Markdown to HTML** or to **JSON**. It also adds support for custom syntax to extend the feature set of Markdown.

Dimer uses this inside it's CMS and the CLI to transform your Markdown files to JSON and then saves with the server.

## Installation

```js
npm i @dimerapp/markdown

# Yarn
yarn add @dimerapp/markdown
```

## Usage
After installation, import the module and use it as follows.

```js
const Markdown = require('@dimerapp/markdown')

const content = `
# Hello world

Some stuff goes here.
`

const md = new Markdown(content, options)

await md.toHTML()

// or toJSON
await md.toJSON()
```

#### Options

Here's the list of available options.

| Key | Value | Description|
|----|--------|------------|
| title | String | A custom title for the document. This will be used, if there is no top-level `H1`|
| skipToc | Boolean | Do not generate the TOC |
| onUrl | Function | Invoked everytime a relative URL is detected inside the markdown links or images. You can return a custom URL, which will replace the existing one. Read more about [assets detection](#assets-detection).


## Macros
Dimer extends the markdown using Macro's. All macros shares the same syntax structure (to keep it easier to consume) and new one's can be added to this library.

**A macro can be an inline macro or a block level macro.**

#### note (block)
The note macro creates a `div` with `className=alert-note` and can be used as follows.

```md
[note]
This is a note
[/note]
```

Following are the alert style macros and creates a div like the `note` macro.

| Macro | Div class |
|---------|---------|
| warn | alert-warning |
| tip | alert-tip |

#### codepen (inline)
Adds a codepen embed to the document.

```md
[codepen url="https://codepen.io/ge1doot/pen/vRJyVG", theme="light"]
```

#### youtube (inline)
Adds a youtube embed

```md
[youtube url="", height="", width=""]
```

#### collapse (block)

```md
[collapse title=""]
Inner content
[/collapse]
```

Output

```html
<div class="collapse">
  <div class="collapsible-toggle"> TITLE </div>
  <div class="collapsible-content"> Inner content </div>
</div>
```

#### codegroup (block)

Creates a tabbed group of multiple codeblocks.

``````md
[codegroup]

```js
Tab one
```

```js
Tab two
```

[/codegroup]
``````

#### include(inline)
Include other markdown files as partials.

```md
[include path="./relative-path.md"]
```

Also, you can tell the include block to include the file inside `codeblocks`. This is helpful, when you want to lint the source file using some external linter and include it inside the markdown.

```md
[include path="./relative-path.json", codeblock="true", language="json", lineHighlight="1-4,8-10", displayName="users.json"]
```

- **path** is the relative path to the file to include.
- **codeblock** with the value of true will wrap the content inside the `codeblocks`.
- **language (valid when codeblock=true)** the source language to highlight the code.
- **lineHighlight (valid when codeblock=true)** The lines to highlight inside the source block.
- **displayName (valid when codeblock=true)** The name of the tab when include is inside a `codegroup`.


## Adding new macro
You can also add your own macros as follows. 

> **NOTE**: Macros are added at the global level and not per instance level.

#### addMacro(name, callback, [inline = false])
```js
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
}, false)

const md = new Markdown(`
[button text="Click here to login"]
`)

await md.toHTML()
// returns: <button class="button">Click here to login</button>
```

## JSON AST
The biggest feature of this module is the ability to output the JSON AST for your markdown. AST makes it super easy compose custom layouts, whereas the concrete HTML is harder to modify and customise.

Following the nodes structure of the AST.

#### Top level node

```js
{
  type: 'root',
  children: [] // array of child nodes
}
```

#### Element node

```js
{
  type: 'element',
  tag: 'p',
  props: {},
  children: [] // nested childs
}
```

#### Text node

```js
{
  type: 'text',
  value: 'The raw text'
}
```

## Assets detection
Dimer has a feature, where it will detect the relative images inside markdown and uploads them to the CDN. Also it will transparently replace the relative links with the uploaded file URL.

You do need the infrastructure and code around adding this feature when using this module. However, this module does let you define a custom callback, which can be used for detecting image URL's and returning a different URL to be replaced with.

Here's an example of same

```js
const markdown = new Markdown({
  onUrl: async function (relativeUrl, file) {
    await fs.copyFile('DEST_PATH')
    return {
      url: NEW_URL,
      data: {
        hProperties: {
          dataSrc: '',
          rel: ''
        }
      } // optional
    }
  }
})
```

## Syntax guide
The syntax guide is available [here](syntax.md). It shows the Markdown code with the output in HTML and JSON.

## Development
1. Fork and clone the repo.
2. Make your changes with good commit messages.
3. Once done, share a PR.

## License

The code is released under [MIT License](LICENSE.md).

## Contributors

[thetulage](https://github.com/thetutlage) and everyone who has committed to this repo are proud contributors.
