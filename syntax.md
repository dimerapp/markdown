# Dimer syntax file
<details>
<summary>paragraphs</summary>
<h3>Markdown</h3>

````
This is a paragraph
and in same line

Another paragraph
````

<h3>Html</h3>

```
<p>This is a paragraph and in same line</p>
<p>Another paragraph</p>
```

</details>
<details>
<summary>headings</summary>
<h3>Markdown</h3>

````
# Heading 1

With some text here

## Heading 2
````

<h3>Html</h3>

```
<h1 id="heading-1"><a href="#heading-1" aria-hidden="true"><span class="icon icon-link"></span></a>Heading 1</h1>
<p>With some text here</p>
<h2 id="heading-2"><a href="#heading-2" aria-hidden="true"><span class="icon icon-link"></span></a>Heading 2</h2>
```

</details>
<details>
<summary>nested-list</summary>
<h3>Markdown</h3>

````
- item 1
    This is nested p
    ```
      var a = require('a')
    ```
- item 2
  - nested item 2.1
````

<h3>Html</h3>

```
<ul>
    <li>
        <p>item 1 This is nested p</p>
        <pre><code>  var a = require('a')
</code></pre>
    </li>
    <li>
        <p>item 2</p>
        <ul>
            <li>nested item 2.1</li>
        </ul>
    </li>
</ul>
```

</details>
<details>
<summary>checkbox</summary>
<h3>Markdown</h3>

````
- [ ] Todo 1
- [x] Todo completed
````

<h3>Html</h3>

```
<ul>
    <li class="task-list-item"><input type="checkbox" disabled> Todo 1</li>
    <li class="task-list-item"><input type="checkbox" checked disabled> Todo completed</li>
</ul>
```

</details>
<details>
<summary>codeblocks</summary>
<h3>Markdown</h3>

````
```js
var a = require('a')
a.run()
```
````

<h3>Html</h3>

```
<pre><code class="language-js">var a = require('a')
a.run()
</code></pre>
```

</details>
<details>
<summary>thematic-breaks</summary>
<h3>Markdown</h3>

````
Foo
***
bar
````

<h3>Html</h3>

```
<p>Foo</p>
<hr>
<p>bar</p>
```

</details>
<details>
<summary>blockquote</summary>
<h3>Markdown</h3>

````
> This is a single line blockquote

<!-- -->

> This is a blockquote in multiple lines
>
> Another line
````

<h3>Html</h3>

```
<blockquote>
    <p>This is a single line blockquote</p>
</blockquote>
<blockquote>
    <p>This is a blockquote in multiple lines</p>
    <p>Another line</p>
</blockquote>
```

</details>
<details>
<summary>simple-tables</summary>
<h3>Markdown</h3>

````
| th 1  | th 2 |
|-------|------|
| td 1 | td 2 |
````

<h3>Html</h3>

```
<table>
    <thead>
        <tr>
            <th>th 1</th>
            <th>th 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>td 1</td>
            <td>td 2</td>
        </tr>
    </tbody>
</table>
```

</details>
<details>
<summary>aligned-tables</summary>
<h3>Markdown</h3>

````
| th 1  | th 2 |
|:-------:|------:|
| td 1 | td 2 |
````

<h3>Html</h3>

```
<table>
    <thead>
        <tr>
            <th align="center">th 1</th>
            <th align="right">th 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">td 1</td>
            <td align="right">td 2</td>
        </tr>
    </tbody>
</table>
```

</details>
<details>
<summary>table-escaped-pipes</summary>
<h3>Markdown</h3>

````
| f\|oo  |
| ------ |
| b`|` az |
| b**\|** im |
````

<h3>Html</h3>

```
<table>
    <thead>
        <tr>
            <th>f | oo
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>b
                <code>|</code> az
            </td>
        </tr>
        <tr>
            <td>b
                <strong>|</strong> im
            </td>
        </tr>
    </tbody>
</table>
```

</details>
<details>
<summary>codeblock-in-blockquote</summary>
<h3>Markdown</h3>

````
> Blockquote start
```
var a = require('a')
```
````

<h3>Html</h3>

```
<blockquote>
    <p>Blockquote start</p>
    <pre><code>var a = require('a')
</code></pre>
</blockquote>
```

</details>
<details>
<summary>break-list</summary>
<h3>Markdown</h3>

````
- foo
- bar
+ baz
````

<h3>Html</h3>

```
<ul>
    <li>foo</li>
    <li>bar</li>
</ul>
<ul>
    <li>baz</li>
</ul>
```

</details>
<details>
<summary>inlines</summary>
<h3>Markdown</h3>

````
Cozy *lummox* gives **smart** `squid who` asks for ~~job~~ pen.
````

<h3>Html</h3>

```
<p>Cozy <em>lummox</em> gives <strong>smart</strong> <code>squid who</code> asks for <del>job</del> pen.</p>
```

</details>
<details>
<summary>escaped-inlines</summary>
<h3>Markdown</h3>

````
\*not emphasized*
\[not a link](/foo)
\`not code`
1\. not a list
\* not a list
\# not a heading
\[foo]: /url "not a reference"
````

<h3>Html</h3>

```
<p>*not emphasized* [not a link](/foo) `not code` 1. not a list * not a list # not a heading [foo]: /url "not a reference"</p>
```

</details>
<details>
<summary>macro-note</summary>
<h3>Markdown</h3>

````
# Showing note

[note]
This is a note
[/note]

Some text afterwards too
````

<h3>Html</h3>

```
<h1 id="showing-note"><a href="#showing-note" aria-hidden="true"><span class="icon icon-link"></span></a>Showing note</h1>
<div class="alert alert-note">
    <p>This is a note</p>
</div>
<p>Some text afterwards too</p>
```

</details>
<details>
<summary>macro-tip</summary>
<h3>Markdown</h3>

````
# Showing note

[tip]
This is a tip
[/tip]

Some text afterwards too
````

<h3>Html</h3>

```
<h1 id="showing-note"><a href="#showing-note" aria-hidden="true"><span class="icon icon-link"></span></a>Showing note</h1>
<div class="alert alert-tip">
    <p>This is a tip</p>
</div>
<p>Some text afterwards too</p>
```

</details>
<details>
<summary>macro-warning</summary>
<h3>Markdown</h3>

````
# Showing note

[warn]
This is a warn
[/warn]

Some text afterwards too
````

<h3>Html</h3>

```
<h1 id="showing-note"><a href="#showing-note" aria-hidden="true"><span class="icon icon-link"></span></a>Showing note</h1>
<div class="alert alert-warning">
    <p>This is a warn</p>
</div>
<p>Some text afterwards too</p>
```

</details>
<details>
<summary>nested-macros</summary>
<h3>Markdown</h3>

````
- List item 1

  [note]
  This is a note
  [/note]
````

<h3>Html</h3>

```
<ul>
    <li>
        <p>List item 1</p>
        <div class="alert alert-note">
            <p>This is a note</p>
        </div>
    </li>
</ul>
```

</details>
<details>
<summary>codepen</summary>
<h3>Markdown</h3>

````
[codepen url=https://codepen.io/ge1doot/pen/vRJyVG]
````

<h3>Html</h3>

```
<div class="embed codepen"><iframe src="//codepen.io/ge1doot/embed/preview/vRJyVG?height=410&#x26;theme-id=dark&#x26;default-tab=result&#x26;embed-version=2" height="410" scrolling="no" title="vRJyVG" frameborder="none" allowtransparency="true" allowfullscreen style="width: 100%;"></iframe></div>
```

</details>
<details>
<summary>codepen-custom-height</summary>
<h3>Markdown</h3>

````
[codepen url=https://codepen.io/ge1doot/pen/vRJyVG, height=200]
````

<h3>Html</h3>

```
<div class="embed codepen"><iframe src="//codepen.io/ge1doot/embed/preview/vRJyVG?height=200&#x26;theme-id=dark&#x26;default-tab=result&#x26;embed-version=2" height="200" scrolling="no" title="vRJyVG" frameborder="none" allowtransparency="true" allowfullscreen style="width: 100%;"></iframe></div>
```

</details>
<details>
<summary>codepen-missing-url</summary>
<h3>Markdown</h3>

````
[codepen]
````

<h3>Html</h3>

```
<div>Url missing for codepen macro</div>
```

</details>
<details>
<summary>youtube</summary>
<h3>Markdown</h3>

````
This is a video

[youtube url=https://www.youtube.com/watch?v=xKwHGewa9Fg]
````

<h3>Html</h3>

```
<div class="embed youtube"><iframe src="https://www.youtube.com/embed" height="400" width="100%" frameborder="none" allowfullscreen></iframe></div>
```

</details>
