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
<dimertitle>Heading 1</dimertitle>
<h1 id="heading-1"><a href="#heading-1" aria-hidden="true"><span class="icon icon-link"></span></a>Heading 1</h1>
<p>With some text here</p>
<div class="toc-container">
    <h2>Table of contents</h2>
    <ul>
        <li><a href="#heading-2">Heading 2</a></li>
    </ul>
</div>
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
        <div class="dimer-highlight">
            <pre class="line-numbers"><code>var a = require('a')
</code></pre>
        </div>
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
    <li class="task-list-item"><input type="checkbox" disabled>
        <p>Todo 1</p>
    </li>
    <li class="task-list-item"><input type="checkbox" disabled checked>
        <p>Todo completed</p>
    </li>
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
<div class="dimer-highlight">
    <pre class="language-js line-numbers"><code>var a = require('a')
a.run()
</code></pre>
</div>
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
            <th>f | oo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>b <code>|</code> az</td>
        </tr>
        <tr>
            <td>b <strong>|</strong> im</td>
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
    <div class="dimer-highlight">
        <pre class="line-numbers"><code>var a = require('a')
</code></pre>
    </div>
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
<dimertitle>Showing note</dimertitle>
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
# Showing tip

[tip]
This is a tip
[/tip]

Some text afterwards too
````

<h3>Html</h3>

```
<dimertitle>Showing tip</dimertitle>
<h1 id="showing-tip"><a href="#showing-tip" aria-hidden="true"><span class="icon icon-link"></span></a>Showing tip</h1>
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
# Showing warning

[warn]
This is a warn
[/warn]

Some text afterwards too
````

<h3>Html</h3>

```
<dimertitle>Showing warning</dimertitle>
<h1 id="showing-warning"><a href="#showing-warning" aria-hidden="true"><span class="icon icon-link"></span></a>Showing warning</h1>
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
<div class="embed codepen"><iframe src="//codepen.io/ge1doot/embed/preview/vRJyVG?height=410&#x26;theme-id=light&#x26;default-tab=result&#x26;embed-version=2" height="410" scrolling="no" title="vRJyVG" frameborder="none" allowtransparency="true" allowfullscreen style="width: 100%;"></iframe></div>
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
<div class="embed codepen"><iframe src="//codepen.io/ge1doot/embed/preview/vRJyVG?height=200&#x26;theme-id=light&#x26;default-tab=result&#x26;embed-version=2" height="200" scrolling="no" title="vRJyVG" frameborder="none" allowtransparency="true" allowfullscreen style="width: 100%;"></iframe></div>
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
[youtube url="https://www.youtube.com/watch?v=xKwHGewa9Fg"]
````

<h3>Html</h3>

```
<div class="embed youtube"><iframe src="https://www.youtube.com/embed/xKwHGewa9Fg" width="100%" height="400" frameborder="none" allowfullscreen></iframe></div>
```

</details>
<details>
<summary>youtube-be-url</summary>
<h3>Markdown</h3>

````
[youtube url="https://youtu.be/xKwHGewa9Fg"]
````

<h3>Html</h3>

```
<div class="embed youtube"><iframe src="https://www.youtube.com/embed/xKwHGewa9Fg" width="100%" height="400" frameborder="none" allowfullscreen></iframe></div>
```

</details>
<details>
<summary>youtube-missing-url</summary>
<h3>Markdown</h3>

````
[youtube url=""]
````

<h3>Html</h3>

```
<div>Url missing for youtube macro</div>
```

</details>
<details>
<summary>youtube-invalid-url</summary>
<h3>Markdown</h3>

````
[youtube url="http://youtube.com/watch"]
````

<h3>Html</h3>

```
<div>The youtube macro needs a youtube/watch or youtu.be URL</div>
```

</details>
<details>
<summary>details</summary>
<h3>Markdown</h3>

````
[collapse title="cname"]
Cname is the custom domain that you want to point to `subdomain.dimerapp.com`. Learn more about cnames [here](cnames).
[/collapse]
````

<h3>Html</h3>

```
<div class="collapsible">
    <div class="collapsible-toggle">cname</div>
    <div class="collapsible-content">
        <p>Cname is the custom domain that you want to point to <code>subdomain.dimerapp.com</code>. Learn more about cnames <a href="cnames">here</a>.</p>
    </div>
</div>
```

</details>
<details>
<summary>details-missing-title</summary>
<h3>Markdown</h3>

````
[collapse]
Cname is the custom domain that you want to point to `subdomain.dimerapp.com`. Learn more about cnames [here](cnames).
[/collapse]
````

<h3>Html</h3>

```
<div>Make sure to give a title to the collapse macro</div>
```

</details>
<details>
<summary>codeblocks-linehighlights</summary>
<h3>Markdown</h3>

````
```js{2,4}
var a = require('a')
return a.foo()
```
````

<h3>Html</h3>

```
<div class="dimer-highlight">
    <pre class="language-js line-numbers" data-line="2,4"><code>var a = require('a')
return a.foo()
</code></pre>
</div>
```

</details>
<details>
<summary>codeblocks-filename</summary>
<h3>Markdown</h3>

````
```js{}{index.js}
var a = require('a')
return a.foo()
```
````

<h3>Html</h3>

```
<div class="dimer-highlight"><span class="filename">index.js</span>
    <pre class="language-js line-numbers"><code>var a = require('a')
return a.foo()
</code></pre>
</div>
```

</details>
<details>
<summary>codegroup</summary>
<h3>Markdown</h3>

````
[codegroup]
```js
var a = require('a')
```

```js
var b = require('b')
```
[/codegroup]
````

<h3>Html</h3>

```
<div class="tabs">
    <div class="tab-head">
        <ul>
            <li data-title="tab-1">Tab 1</li>
            <li data-title="tab-2">Tab 2</li>
        </ul>
    </div>
    <div class="tab-body">
        <div class="tab-item" id="tab-1">
            <div class="dimer-highlight">
                <pre class="language-js line-numbers"><code>var a = require('a')
</code></pre>
            </div>
        </div>
        <div class="tab-item" id="tab-2">
            <div class="dimer-highlight">
                <pre class="language-js line-numbers"><code>var b = require('b')
</code></pre>
            </div>
        </div>
    </div>
</div>
```

</details>
<details>
<summary>codegroup-with-names</summary>
<h3>Markdown</h3>

````
[codegroup]
```js{}{a.js}
var a = require('a')
```

```js{}{b.js}
var b = require('b')
```
[/codegroup]
````

<h3>Html</h3>

```
<div class="tabs">
    <div class="tab-head">
        <ul>
            <li data-title="tab-1">a.js</li>
            <li data-title="tab-2">b.js</li>
        </ul>
    </div>
    <div class="tab-body">
        <div class="tab-item" id="tab-1">
            <div class="dimer-highlight"><span class="filename">a.js</span>
                <pre class="language-js line-numbers"><code>var a = require('a')
</code></pre>
            </div>
        </div>
        <div class="tab-item" id="tab-2">
            <div class="dimer-highlight"><span class="filename">b.js</span>
                <pre class="language-js line-numbers"><code>var b = require('b')
</code></pre>
            </div>
        </div>
    </div>
</div>
```

</details>
<details>
<summary>codegroup-one-block</summary>
<h3>Markdown</h3>

````
[codegroup]
```
var a = require('a')
```
[/codegroup]
````

<h3>Html</h3>

```
<div class="tabs">
    <div class="tab-head">
        <ul>
            <li data-title="tab-1">Tab 1</li>
        </ul>
    </div>
    <div class="tab-body">
        <div class="tab-item" id="tab-1">
            <div class="dimer-highlight">
                <pre class="line-numbers"><code>var a = require('a')
</code></pre>
            </div>
        </div>
    </div>
</div>
```

</details>
<details>
<summary>codegroup-empty</summary>
<h3>Markdown</h3>

````
[codegroup]
[/codegroup]
````

<h3>Html</h3>

```

```

</details>
<details>
<summary>codegroup-with-text</summary>
<h3>Markdown</h3>

````
[codegroup]
Hello this is the first block guys

1. It will be named after the filename

```js{}{index.js}
var a = require('a')
```
[/codegroup]
````

<h3>Html</h3>

```
<div class="tabs">
    <div class="tab-head">
        <ul>
            <li data-title="tab-1">index.js</li>
        </ul>
    </div>
    <div class="tab-body">
        <div class="tab-item" id="tab-1">
            <p>Hello this is the first block guys</p>
            <ol>
                <li>It will be named after the filename</li>
            </ol>
            <div class="dimer-highlight"><span class="filename">index.js</span>
                <pre class="language-js line-numbers"><code>var a = require('a')
</code></pre>
            </div>
        </div>
    </div>
</div>
```

</details>
<details>
<summary>toc</summary>
<h3>Markdown</h3>

````
# This is a title

I expect toc after this paragraph

## This is heading2

## This is header 2 again
````

<h3>Html</h3>

```
<dimertitle>This is a title</dimertitle>
<h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden="true"><span class="icon icon-link"></span></a>This is a title</h1>
<p>I expect toc after this paragraph</p>
<div class="toc-container">
    <h2>Table of contents</h2>
    <ul>
        <li><a href="#this-is-heading2">This is heading2</a></li>
        <li><a href="#this-is-header-2-again">This is header 2 again</a></li>
    </ul>
</div>
<h2 id="this-is-heading2"><a href="#this-is-heading2" aria-hidden="true"><span class="icon icon-link"></span></a>This is heading2</h2>
<h2 id="this-is-header-2-again"><a href="#this-is-header-2-again" aria-hidden="true"><span class="icon icon-link"></span></a>This is header 2 again</h2>
```

</details>
<details>
<summary>toc-shifted-paragraph</summary>
<h3>Markdown</h3>

````
# This is a title

[note]
This is a note
[/note]

I expect toc before this paragraph

## This is heading2

## This is header 2 again
````

<h3>Html</h3>

```
<dimertitle>This is a title</dimertitle>
<h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden="true"><span class="icon icon-link"></span></a>This is a title</h1>
<div class="alert alert-note">
    <p>This is a note</p>
</div>
<div class="toc-container">
    <h2>Table of contents</h2>
    <ul>
        <li><a href="#this-is-heading2">This is heading2</a></li>
        <li><a href="#this-is-header-2-again">This is header 2 again</a></li>
    </ul>
</div>
<p>I expect toc before this paragraph</p>
<h2 id="this-is-heading2"><a href="#this-is-heading2" aria-hidden="true"><span class="icon icon-link"></span></a>This is heading2</h2>
<h2 id="this-is-header-2-again"><a href="#this-is-header-2-again" aria-hidden="true"><span class="icon icon-link"></span></a>This is header 2 again</h2>
```

</details>
<details>
<summary>toc-missing-paragraph</summary>
<h3>Markdown</h3>

````
# This is a title

## This is heading2

## This is header 2 again
````

<h3>Html</h3>

```
<dimertitle>This is a title</dimertitle>
<h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden="true"><span class="icon icon-link"></span></a>This is a title</h1>
<div class="toc-container">
    <h2>Table of contents</h2>
    <ul>
        <li><a href="#this-is-heading2">This is heading2</a></li>
        <li><a href="#this-is-header-2-again">This is header 2 again</a></li>
    </ul>
</div>
<h2 id="this-is-heading2"><a href="#this-is-heading2" aria-hidden="true"><span class="icon icon-link"></span></a>This is heading2</h2>
<h2 id="this-is-header-2-again"><a href="#this-is-header-2-again" aria-hidden="true"><span class="icon icon-link"></span></a>This is header 2 again</h2>
```

</details>
<details>
<summary>toc-no-title</summary>
<h3>Markdown</h3>

````
## Starting from h2
Some content here
````

<h3>Html</h3>

```
<h2 id="starting-from-h2"><a href="#starting-from-h2" aria-hidden="true"><span class="icon icon-link"></span></a>Starting from h2</h2>
<p>Some content here</p>
```

</details>
