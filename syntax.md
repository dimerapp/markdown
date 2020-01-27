# Dimer syntax file 
<details>
<summary>paragraphs</summary>
<h3>Markdown</h3>

````md
This is a paragraph
and in same line

Another paragraph
````

<h3>Html</h3>

```html
<p>This is a paragraph and in same line</p>
<p>Another paragraph</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph and in same line"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Another paragraph"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>headings</summary>
<h3>Markdown</h3>

````md
# Heading 1

With some text here

## Heading 2
````

<h3>Html</h3>

```html
<dimertitle>Heading 1</dimertitle>
<h1 id="heading-1"><a href="#heading-1" aria-hidden><span class="icon icon-link"></span></a>Heading 1</h1>
<p>With some text here</p>
<div class="toc-container">
    <h2>Table of contents</h2>
    <ul>
        <li><a href="#heading-2">Heading 2</a></li>
    </ul>
</div>
<h2 id="heading-2"><a href="#heading-2" aria-hidden><span class="icon icon-link"></span></a>Heading 2</h2>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "dimertitle",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Heading 1"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h1",
      "props": {
        "id": "heading-1"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#heading-1",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "Heading 1"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "With some text here"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "toc-container"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "h2",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "Table of contents"
            }
          ]
        },
        {
          "type": "element",
          "tag": "ul",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "li",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "props": {
                    "href": "#heading-2"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "Heading 2"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "h2",
      "props": {
        "id": "heading-2"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#heading-2",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "Heading 2"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>nested-list</summary>
<h3>Markdown</h3>

````md
- item 1
    This is nested p
    ```
    var a = require('a')
    ```
- item 2
  - nested item 2.1
````

<h3>Html</h3>

```html
<ul>
    <li>
        <p>item 1 This is nested p</p>
        <div class="dimer-highlight">
            <pre class="language-text line-numbers"><code>var a = require('a')
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

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "ul",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "li",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "p",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "item 1 This is nested p"
                }
              ]
            },
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "dimer-highlight"
                ]
              },
              "children": [
                {
                  "type": "element",
                  "tag": "pre",
                  "props": {
                    "className": [
                      "language-text",
                      "line-numbers"
                    ]
                  },
                  "children": [
                    {
                      "type": "element",
                      "tag": "code",
                      "props": {},
                      "children": [
                        {
                          "type": "text",
                          "value": "var a = require('a')\n"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "li",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "p",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "item 2"
                }
              ]
            },
            {
              "type": "element",
              "tag": "ul",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "li",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "nested item 2.1"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>checkbox</summary>
<h3>Markdown</h3>

````md
- [ ] Todo 1
- [x] Todo completed
````

<h3>Html</h3>

```html
<ul>
    <li class="task-list-item"><input type="checkbox" disabled>
        <p>Todo 1</p>
    </li>
    <li class="task-list-item"><input type="checkbox" disabled checked>
        <p>Todo completed</p>
    </li>
</ul>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "ul",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "li",
          "props": {
            "className": [
              "task-list-item"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "input",
              "props": {
                "type": "checkbox",
                "disabled": true
              },
              "children": []
            },
            {
              "type": "element",
              "tag": "p",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "Todo 1"
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "li",
          "props": {
            "className": [
              "task-list-item"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "input",
              "props": {
                "type": "checkbox",
                "disabled": true,
                "checked": true
              },
              "children": []
            },
            {
              "type": "element",
              "tag": "p",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "Todo completed"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codeblocks</summary>
<h3>Markdown</h3>

````md
```js
var a = require('a')
a.run()
```
````

<h3>Html</h3>

```html
<div class="dimer-highlight">
    <pre class="language-js line-numbers"><code>var a = require('a')
a.run()
</code></pre>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "dimer-highlight"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "pre",
          "props": {
            "className": [
              "language-js",
              "line-numbers"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "code",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "var a = require('a')\na.run()\n"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codeblocks-no-lang</summary>
<h3>Markdown</h3>

````md
```
var a = require('a')
a.run()
```
````

<h3>Html</h3>

```html
<div class="dimer-highlight">
    <pre class="language-text line-numbers"><code>var a = require('a')
a.run()
</code></pre>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "dimer-highlight"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "pre",
          "props": {
            "className": [
              "language-text",
              "line-numbers"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "code",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "var a = require('a')\na.run()\n"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>thematic-breaks</summary>
<h3>Markdown</h3>

````md
Foo
***
bar
````

<h3>Html</h3>

```html
<p>Foo</p>
<hr>
<p>bar</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Foo"
        }
      ]
    },
    {
      "type": "element",
      "tag": "hr",
      "props": {},
      "children": []
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "bar"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>blockquote</summary>
<h3>Markdown</h3>

````md
> This is a single line blockquote

<!-- -->

> This is a blockquote in multiple lines
>
> Another line
````

<h3>Html</h3>

```html
<blockquote>
    <p>This is a single line blockquote</p>
</blockquote>
<blockquote>
    <p>This is a blockquote in multiple lines</p>
    <p>Another line</p>
</blockquote>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "blockquote",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "This is a single line blockquote"
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "blockquote",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "This is a blockquote in multiple lines"
            }
          ]
        },
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "Another line"
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>simple-tables</summary>
<h3>Markdown</h3>

````md
| th 1  | th 2 |
|-------|------|
| td 1 | td 2 |
````

<h3>Html</h3>

```html
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

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "table",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "thead",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "tr",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "th",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "th 1"
                    }
                  ]
                },
                {
                  "type": "element",
                  "tag": "th",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "th 2"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "tbody",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "tr",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "td",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "td 1"
                    }
                  ]
                },
                {
                  "type": "element",
                  "tag": "td",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "td 2"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>aligned-tables</summary>
<h3>Markdown</h3>

````md
| th 1  | th 2 |
|:-------:|------:|
| td 1 | td 2 |
````

<h3>Html</h3>

```html
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

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "table",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "thead",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "tr",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "th",
                  "props": {
                    "align": "center"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "th 1"
                    }
                  ]
                },
                {
                  "type": "element",
                  "tag": "th",
                  "props": {
                    "align": "right"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "th 2"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "tbody",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "tr",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "td",
                  "props": {
                    "align": "center"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "td 1"
                    }
                  ]
                },
                {
                  "type": "element",
                  "tag": "td",
                  "props": {
                    "align": "right"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "td 2"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>table-escaped-pipes</summary>
<h3>Markdown</h3>

````md
| f\|oo  |
| ------ |
| b`|` az |
| b**\|** im |
````

<h3>Html</h3>

```html
<table>
    <thead>
        <tr>
            <th>f|oo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>b<code>|</code> az</td>
        </tr>
        <tr>
            <td>b<strong>|</strong> im</td>
        </tr>
    </tbody>
</table>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "table",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "thead",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "tr",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "th",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "f"
                    },
                    {
                      "type": "text",
                      "value": "|"
                    },
                    {
                      "type": "text",
                      "value": "oo"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "tbody",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "tr",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "td",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "b"
                    },
                    {
                      "type": "element",
                      "tag": "code",
                      "props": {},
                      "children": [
                        {
                          "type": "text",
                          "value": "|"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "value": " az"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "tag": "tr",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "td",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "b"
                    },
                    {
                      "type": "element",
                      "tag": "strong",
                      "props": {},
                      "children": [
                        {
                          "type": "text",
                          "value": "|"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "value": " im"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codeblock-in-blockquote</summary>
<h3>Markdown</h3>

````md
> Blockquote start
```
var a = require('a')
```
````

<h3>Html</h3>

```html
<blockquote>
    <p>Blockquote start</p>
    <div class="dimer-highlight">
        <pre class="language-text line-numbers"><code>var a = require('a')
</code></pre>
    </div>
</blockquote>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "blockquote",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "Blockquote start"
            }
          ]
        },
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "dimer-highlight"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "pre",
              "props": {
                "className": [
                  "language-text",
                  "line-numbers"
                ]
              },
              "children": [
                {
                  "type": "element",
                  "tag": "code",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "var a = require('a')\n"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>break-list</summary>
<h3>Markdown</h3>

````md
- foo
- bar
+ baz
````

<h3>Html</h3>

```html
<ul>
    <li>foo</li>
    <li>bar</li>
</ul>
<ul>
    <li>baz</li>
</ul>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "ul",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "li",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "foo"
            }
          ]
        },
        {
          "type": "element",
          "tag": "li",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "bar"
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "ul",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "li",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "baz"
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>inlines</summary>
<h3>Markdown</h3>

````md
Cozy *lummox* gives **smart** `squid who` asks for ~~job~~ pen.
````

<h3>Html</h3>

```html
<p>Cozy <em>lummox</em> gives <strong>smart</strong> <code>squid who</code> asks for <del>job</del> pen.</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Cozy "
        },
        {
          "type": "element",
          "tag": "em",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "lummox"
            }
          ]
        },
        {
          "type": "text",
          "value": " gives "
        },
        {
          "type": "element",
          "tag": "strong",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "smart"
            }
          ]
        },
        {
          "type": "text",
          "value": " "
        },
        {
          "type": "element",
          "tag": "code",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "squid who"
            }
          ]
        },
        {
          "type": "text",
          "value": " asks for "
        },
        {
          "type": "element",
          "tag": "del",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "job"
            }
          ]
        },
        {
          "type": "text",
          "value": " pen."
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>escaped-inlines</summary>
<h3>Markdown</h3>

````md
\*not emphasized*
\[not a link](/foo)
\`not code`
1\. not a list
\* not a list
\# not a heading
\[foo]: /url "not a reference"
````

<h3>Html</h3>

```html
<p>*not emphasized* [not a link](/foo) `not code` 1. not a list * not a list # not a heading [foo]: /url "not a reference"</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "*"
        },
        {
          "type": "text",
          "value": "not emphasized* "
        },
        {
          "type": "text",
          "value": "["
        },
        {
          "type": "text",
          "value": "not a link](/foo) "
        },
        {
          "type": "text",
          "value": "`"
        },
        {
          "type": "text",
          "value": "not code` 1"
        },
        {
          "type": "text",
          "value": "."
        },
        {
          "type": "text",
          "value": " not a list "
        },
        {
          "type": "text",
          "value": "*"
        },
        {
          "type": "text",
          "value": " not a list "
        },
        {
          "type": "text",
          "value": "#"
        },
        {
          "type": "text",
          "value": " not a heading "
        },
        {
          "type": "text",
          "value": "["
        },
        {
          "type": "text",
          "value": "foo]: /url \"not a reference\""
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>macro-note</summary>
<h3>Markdown</h3>

````md
# Showing note

[note]
This is a note
[/note]

Some text afterwards too
````

<h3>Html</h3>

```html
<dimertitle>Showing note</dimertitle>
<h1 id="showing-note"><a href="#showing-note" aria-hidden><span class="icon icon-link"></span></a>Showing note</h1>
<div class="alert alert-note">
    <p>This is a note</p>
</div>
<p>Some text afterwards too</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "dimertitle",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Showing note"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h1",
      "props": {
        "id": "showing-note"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#showing-note",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "Showing note"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "alert",
          "alert-note"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "This is a note"
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Some text afterwards too"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>macro-tip</summary>
<h3>Markdown</h3>

````md
# Showing tip

[tip]
This is a tip
[/tip]

Some text afterwards too
````

<h3>Html</h3>

```html
<dimertitle>Showing tip</dimertitle>
<h1 id="showing-tip"><a href="#showing-tip" aria-hidden><span class="icon icon-link"></span></a>Showing tip</h1>
<div class="alert alert-tip">
    <p>This is a tip</p>
</div>
<p>Some text afterwards too</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "dimertitle",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Showing tip"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h1",
      "props": {
        "id": "showing-tip"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#showing-tip",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "Showing tip"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "alert",
          "alert-tip"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "This is a tip"
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Some text afterwards too"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>macro-warning</summary>
<h3>Markdown</h3>

````md
# Showing warning

[warn]
This is a warn
[/warn]

Some text afterwards too
````

<h3>Html</h3>

```html
<dimertitle>Showing warning</dimertitle>
<h1 id="showing-warning"><a href="#showing-warning" aria-hidden><span class="icon icon-link"></span></a>Showing warning</h1>
<div class="alert alert-warning">
    <p>This is a warn</p>
</div>
<p>Some text afterwards too</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "dimertitle",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Showing warning"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h1",
      "props": {
        "id": "showing-warning"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#showing-warning",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "Showing warning"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "alert",
          "alert-warning"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "This is a warn"
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Some text afterwards too"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>nested-macros</summary>
<h3>Markdown</h3>

````md
- List item 1

  [note]
  This is a note
  [/note]
````

<h3>Html</h3>

```html
<ul>
    <li>
        <p>List item 1</p>
        <div class="alert alert-note">
            <p>This is a note</p>
        </div>
    </li>
</ul>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "ul",
      "props": {},
      "children": [
        {
          "type": "element",
          "tag": "li",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "p",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "List item 1"
                }
              ]
            },
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "alert",
                  "alert-note"
                ]
              },
              "children": [
                {
                  "type": "element",
                  "tag": "p",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "This is a note"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codepen</summary>
<h3>Markdown</h3>

````md
[codepen url=https://codepen.io/ge1doot/pen/vRJyVG]
````

<h3>Html</h3>

```html
<div class="codepen embed"><iframe src="//codepen.io/ge1doot/embed/preview/vRJyVG?height=410&#x26;theme-id=light&#x26;default-tab=result&#x26;embed-version=2" height="410" scrolling="no" title="vRJyVG" frameborder="none" allowtransparency="true" allowfullscreen style="width: 100%;"></iframe></div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "codepen",
          "embed"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "iframe",
          "props": {
            "src": "//codepen.io/ge1doot/embed/preview/vRJyVG?height=410&theme-id=light&default-tab=result&embed-version=2",
            "height": 410,
            "scrolling": "no",
            "title": "vRJyVG",
            "frameborder": "none",
            "allowtransparency": "true",
            "allowfullscreen": "true",
            "style": "width: 100%;"
          },
          "children": []
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codepen-custom-height</summary>
<h3>Markdown</h3>

````md
[codepen url=https://codepen.io/ge1doot/pen/vRJyVG, height=200]
````

<h3>Html</h3>

```html
<div class="codepen embed"><iframe src="//codepen.io/ge1doot/embed/preview/vRJyVG?height=200&#x26;theme-id=light&#x26;default-tab=result&#x26;embed-version=2" height="200" scrolling="no" title="vRJyVG" frameborder="none" allowtransparency="true" allowfullscreen style="width: 100%;"></iframe></div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "codepen",
          "embed"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "iframe",
          "props": {
            "src": "//codepen.io/ge1doot/embed/preview/vRJyVG?height=200&theme-id=light&default-tab=result&embed-version=2",
            "height": "200",
            "scrolling": "no",
            "title": "vRJyVG",
            "frameborder": "none",
            "allowtransparency": "true",
            "allowfullscreen": "true",
            "style": "width: 100%;"
          },
          "children": []
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codepen-missing-url</summary>
<h3>Markdown</h3>

````md
[codepen]
````

<h3>Html</h3>

```html
<div>define url prop on codepen macro</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "define url prop on codepen macro"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>youtube</summary>
<h3>Markdown</h3>

````md
[youtube url="https://www.youtube.com/watch?v=xKwHGewa9Fg"]
````

<h3>Html</h3>

```html
<div class="embed youtube"><iframe src="https://www.youtube.com/embed/xKwHGewa9Fg" width="100%" height="400" frameborder="none" allowfullscreen></iframe></div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "embed",
          "youtube"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "iframe",
          "props": {
            "src": "https://www.youtube.com/embed/xKwHGewa9Fg",
            "width": "100%",
            "height": "400",
            "frameborder": "none",
            "allowfullscreen": true
          },
          "children": []
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>youtube-be-url</summary>
<h3>Markdown</h3>

````md
[youtube url="https://youtu.be/xKwHGewa9Fg"]
````

<h3>Html</h3>

```html
<div class="embed youtube"><iframe src="https://www.youtube.com/embed/xKwHGewa9Fg" width="100%" height="400" frameborder="none" allowfullscreen></iframe></div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "embed",
          "youtube"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "iframe",
          "props": {
            "src": "https://www.youtube.com/embed/xKwHGewa9Fg",
            "width": "100%",
            "height": "400",
            "frameborder": "none",
            "allowfullscreen": true
          },
          "children": []
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>youtube-missing-url</summary>
<h3>Markdown</h3>

````md
[youtube url=""]
````

<h3>Html</h3>

```html
<div>define url prop on youtube macro</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "define url prop on youtube macro"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>youtube-invalid-url</summary>
<h3>Markdown</h3>

````md
[youtube url="http://youtube.com/watch"]
````

<h3>Html</h3>

```html
<div>define valid youtube video url</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "define valid youtube video url"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>details</summary>
<h3>Markdown</h3>

````md
[collapse title="cname"]
Cname is the custom domain that you want to point to `subdomain.dimerapp.com`. Learn more about cnames [here](cnames).
[/collapse]
````

<h3>Html</h3>

```html
<div class="collapsible">
    <div class="collapsible-toggle">cname</div>
    <div class="collapsible-content">
        <p>Cname is the custom domain that you want to point to <code>subdomain.dimerapp.com</code>. Learn more about cnames <a href="cnames">here</a>.</p>
    </div>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "collapsible"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "collapsible-toggle"
            ]
          },
          "children": [
            {
              "type": "text",
              "value": "cname"
            }
          ]
        },
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "collapsible-content"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "p",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "Cname is the custom domain that you want to point to "
                },
                {
                  "type": "element",
                  "tag": "code",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "subdomain.dimerapp.com"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": ". Learn more about cnames "
                },
                {
                  "type": "element",
                  "tag": "a",
                  "props": {
                    "href": "cnames"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "here"
                    }
                  ]
                },
                {
                  "type": "text",
                  "value": "."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>details-missing-title</summary>
<h3>Markdown</h3>

````md
[collapse]
Cname is the custom domain that you want to point to `subdomain.dimerapp.com`. Learn more about cnames [here](cnames).
[/collapse]
````

<h3>Html</h3>

```html
<div>define collapse title</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "define collapse title"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codeblocks-linehighlights</summary>
<h3>Markdown</h3>

````md
```js{2,4}
var a = require('a')
return a.foo()
```
````

<h3>Html</h3>

```html
<div class="dimer-highlight">
    <pre class="language-js line-numbers" data-line="2,4"><code>var a = require('a')
return a.foo()
</code></pre>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "dimer-highlight"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "pre",
          "props": {
            "className": [
              "language-js",
              "line-numbers"
            ],
            "dataLine": "2,4"
          },
          "children": [
            {
              "type": "element",
              "tag": "code",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "var a = require('a')\nreturn a.foo()\n"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codeblocks-filename</summary>
<h3>Markdown</h3>

````md
```js{}{index.js}
var a = require('a')
return a.foo()
```
````

<h3>Html</h3>

```html
<div class="dimer-highlight"><span class="filename">index.js</span>
    <pre class="language-js line-numbers"><code>var a = require('a')
return a.foo()
</code></pre>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "dimer-highlight"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "span",
          "props": {
            "className": [
              "filename"
            ]
          },
          "children": [
            {
              "type": "text",
              "value": "index.js"
            }
          ]
        },
        {
          "type": "element",
          "tag": "pre",
          "props": {
            "className": [
              "language-js",
              "line-numbers"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "code",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "var a = require('a')\nreturn a.foo()\n"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codegroup</summary>
<h3>Markdown</h3>

````md
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

```html
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

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "tabs"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-head"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "ul",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "li",
                  "props": {
                    "dataTitle": "tab-1"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "Tab 1"
                    }
                  ]
                },
                {
                  "type": "element",
                  "tag": "li",
                  "props": {
                    "dataTitle": "tab-2"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "Tab 2"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-body"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "tab-item"
                ],
                "id": "tab-1"
              },
              "children": [
                {
                  "type": "element",
                  "tag": "div",
                  "props": {
                    "className": [
                      "dimer-highlight"
                    ]
                  },
                  "children": [
                    {
                      "type": "element",
                      "tag": "pre",
                      "props": {
                        "className": [
                          "language-js",
                          "line-numbers"
                        ]
                      },
                      "children": [
                        {
                          "type": "element",
                          "tag": "code",
                          "props": {},
                          "children": [
                            {
                              "type": "text",
                              "value": "var a = require('a')\n"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "tab-item"
                ],
                "id": "tab-2"
              },
              "children": [
                {
                  "type": "element",
                  "tag": "div",
                  "props": {
                    "className": [
                      "dimer-highlight"
                    ]
                  },
                  "children": [
                    {
                      "type": "element",
                      "tag": "pre",
                      "props": {
                        "className": [
                          "language-js",
                          "line-numbers"
                        ]
                      },
                      "children": [
                        {
                          "type": "element",
                          "tag": "code",
                          "props": {},
                          "children": [
                            {
                              "type": "text",
                              "value": "var b = require('b')\n"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codegroup-with-names</summary>
<h3>Markdown</h3>

````md
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

```html
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

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "tabs"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-head"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "ul",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "li",
                  "props": {
                    "dataTitle": "tab-1"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "a.js"
                    }
                  ]
                },
                {
                  "type": "element",
                  "tag": "li",
                  "props": {
                    "dataTitle": "tab-2"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "b.js"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-body"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "tab-item"
                ],
                "id": "tab-1"
              },
              "children": [
                {
                  "type": "element",
                  "tag": "div",
                  "props": {
                    "className": [
                      "dimer-highlight"
                    ]
                  },
                  "children": [
                    {
                      "type": "element",
                      "tag": "span",
                      "props": {
                        "className": [
                          "filename"
                        ]
                      },
                      "children": [
                        {
                          "type": "text",
                          "value": "a.js"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "tag": "pre",
                      "props": {
                        "className": [
                          "language-js",
                          "line-numbers"
                        ]
                      },
                      "children": [
                        {
                          "type": "element",
                          "tag": "code",
                          "props": {},
                          "children": [
                            {
                              "type": "text",
                              "value": "var a = require('a')\n"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "tab-item"
                ],
                "id": "tab-2"
              },
              "children": [
                {
                  "type": "element",
                  "tag": "div",
                  "props": {
                    "className": [
                      "dimer-highlight"
                    ]
                  },
                  "children": [
                    {
                      "type": "element",
                      "tag": "span",
                      "props": {
                        "className": [
                          "filename"
                        ]
                      },
                      "children": [
                        {
                          "type": "text",
                          "value": "b.js"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "tag": "pre",
                      "props": {
                        "className": [
                          "language-js",
                          "line-numbers"
                        ]
                      },
                      "children": [
                        {
                          "type": "element",
                          "tag": "code",
                          "props": {},
                          "children": [
                            {
                              "type": "text",
                              "value": "var b = require('b')\n"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codegroup-one-block</summary>
<h3>Markdown</h3>

````md
[codegroup]
```
var a = require('a')
```
[/codegroup]
````

<h3>Html</h3>

```html
<div class="tabs">
    <div class="tab-head">
        <ul>
            <li data-title="tab-1">Tab 1</li>
        </ul>
    </div>
    <div class="tab-body">
        <div class="tab-item" id="tab-1">
            <div class="dimer-highlight">
                <pre class="language-text line-numbers"><code>var a = require('a')
</code></pre>
            </div>
        </div>
    </div>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "tabs"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-head"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "ul",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "li",
                  "props": {
                    "dataTitle": "tab-1"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "Tab 1"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-body"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "tab-item"
                ],
                "id": "tab-1"
              },
              "children": [
                {
                  "type": "element",
                  "tag": "div",
                  "props": {
                    "className": [
                      "dimer-highlight"
                    ]
                  },
                  "children": [
                    {
                      "type": "element",
                      "tag": "pre",
                      "props": {
                        "className": [
                          "language-text",
                          "line-numbers"
                        ]
                      },
                      "children": [
                        {
                          "type": "element",
                          "tag": "code",
                          "props": {},
                          "children": [
                            {
                              "type": "text",
                              "value": "var a = require('a')\n"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>codegroup-empty</summary>
<h3>Markdown</h3>

````md
[codegroup]
[/codegroup]
````

<h3>Html</h3>

```html

```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": []
}</code></pre>

</details>
<details>
<summary>codegroup-with-text</summary>
<h3>Markdown</h3>

````md
[codegroup]
Hello this is the first block guys

1. It will be named after the filename

```js{}{index.js}
var a = require('a')
```
[/codegroup]
````

<h3>Html</h3>

```html
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

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "tabs"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-head"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "ul",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "li",
                  "props": {
                    "dataTitle": "tab-1"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "index.js"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-body"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "tab-item"
                ],
                "id": "tab-1"
              },
              "children": [
                {
                  "type": "element",
                  "tag": "p",
                  "props": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "Hello this is the first block guys"
                    }
                  ]
                },
                {
                  "type": "element",
                  "tag": "ol",
                  "props": {},
                  "children": [
                    {
                      "type": "element",
                      "tag": "li",
                      "props": {},
                      "children": [
                        {
                          "type": "text",
                          "value": "It will be named after the filename"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "element",
                  "tag": "div",
                  "props": {
                    "className": [
                      "dimer-highlight"
                    ]
                  },
                  "children": [
                    {
                      "type": "element",
                      "tag": "span",
                      "props": {
                        "className": [
                          "filename"
                        ]
                      },
                      "children": [
                        {
                          "type": "text",
                          "value": "index.js"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "tag": "pre",
                      "props": {
                        "className": [
                          "language-js",
                          "line-numbers"
                        ]
                      },
                      "children": [
                        {
                          "type": "element",
                          "tag": "code",
                          "props": {},
                          "children": [
                            {
                              "type": "text",
                              "value": "var a = require('a')\n"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>toc</summary>
<h3>Markdown</h3>

````md
# This is a title

I expect toc after this paragraph

## This is heading2

## This is header 2 again
````

<h3>Html</h3>

```html
<dimertitle>This is a title</dimertitle>
<h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden><span class="icon icon-link"></span></a>This is a title</h1>
<p>I expect toc after this paragraph</p>
<div class="toc-container">
    <h2>Table of contents</h2>
    <ul>
        <li><a href="#this-is-heading2">This is heading2</a></li>
        <li><a href="#this-is-header-2-again">This is header 2 again</a></li>
    </ul>
</div>
<h2 id="this-is-heading2"><a href="#this-is-heading2" aria-hidden><span class="icon icon-link"></span></a>This is heading2</h2>
<h2 id="this-is-header-2-again"><a href="#this-is-header-2-again" aria-hidden><span class="icon icon-link"></span></a>This is header 2 again</h2>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "dimertitle",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a title"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h1",
      "props": {
        "id": "this-is-a-title"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-a-title",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is a title"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "I expect toc after this paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "toc-container"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "h2",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "Table of contents"
            }
          ]
        },
        {
          "type": "element",
          "tag": "ul",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "li",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "props": {
                    "href": "#this-is-heading2"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "This is heading2"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "tag": "li",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "props": {
                    "href": "#this-is-header-2-again"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "This is header 2 again"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "h2",
      "props": {
        "id": "this-is-heading2"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-heading2",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is heading2"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h2",
      "props": {
        "id": "this-is-header-2-again"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-header-2-again",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is header 2 again"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>toc-shifted-paragraph</summary>
<h3>Markdown</h3>

````md
# This is a title

[note]
This is a note
[/note]

I expect toc before this paragraph

## This is heading2

## This is header 2 again
````

<h3>Html</h3>

```html
<dimertitle>This is a title</dimertitle>
<h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden><span class="icon icon-link"></span></a>This is a title</h1>
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
<h2 id="this-is-heading2"><a href="#this-is-heading2" aria-hidden><span class="icon icon-link"></span></a>This is heading2</h2>
<h2 id="this-is-header-2-again"><a href="#this-is-header-2-again" aria-hidden><span class="icon icon-link"></span></a>This is header 2 again</h2>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "dimertitle",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a title"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h1",
      "props": {
        "id": "this-is-a-title"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-a-title",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is a title"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "alert",
          "alert-note"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "This is a note"
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "toc-container"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "h2",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "Table of contents"
            }
          ]
        },
        {
          "type": "element",
          "tag": "ul",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "li",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "props": {
                    "href": "#this-is-heading2"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "This is heading2"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "tag": "li",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "props": {
                    "href": "#this-is-header-2-again"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "This is header 2 again"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "I expect toc before this paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h2",
      "props": {
        "id": "this-is-heading2"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-heading2",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is heading2"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h2",
      "props": {
        "id": "this-is-header-2-again"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-header-2-again",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is header 2 again"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>toc-missing-paragraph</summary>
<h3>Markdown</h3>

````md
# This is a title

## This is heading2

## This is header 2 again
````

<h3>Html</h3>

```html
<dimertitle>This is a title</dimertitle>
<h1 id="this-is-a-title"><a href="#this-is-a-title" aria-hidden><span class="icon icon-link"></span></a>This is a title</h1>
<div class="toc-container">
    <h2>Table of contents</h2>
    <ul>
        <li><a href="#this-is-heading2">This is heading2</a></li>
        <li><a href="#this-is-header-2-again">This is header 2 again</a></li>
    </ul>
</div>
<h2 id="this-is-heading2"><a href="#this-is-heading2" aria-hidden><span class="icon icon-link"></span></a>This is heading2</h2>
<h2 id="this-is-header-2-again"><a href="#this-is-header-2-again" aria-hidden><span class="icon icon-link"></span></a>This is header 2 again</h2>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "dimertitle",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a title"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h1",
      "props": {
        "id": "this-is-a-title"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-a-title",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is a title"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "toc-container"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "h2",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "Table of contents"
            }
          ]
        },
        {
          "type": "element",
          "tag": "ul",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "li",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "props": {
                    "href": "#this-is-heading2"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "This is heading2"
                    }
                  ]
                }
              ]
            },
            {
              "type": "element",
              "tag": "li",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "a",
                  "props": {
                    "href": "#this-is-header-2-again"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "This is header 2 again"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "element",
      "tag": "h2",
      "props": {
        "id": "this-is-heading2"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-heading2",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is heading2"
        }
      ]
    },
    {
      "type": "element",
      "tag": "h2",
      "props": {
        "id": "this-is-header-2-again"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#this-is-header-2-again",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "This is header 2 again"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>toc-no-title</summary>
<h3>Markdown</h3>

````md
## Starting from h2
Some content here
````

<h3>Html</h3>

```html
<h2 id="starting-from-h2"><a href="#starting-from-h2" aria-hidden><span class="icon icon-link"></span></a>Starting from h2</h2>
<p>Some content here</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "h2",
      "props": {
        "id": "starting-from-h2"
      },
      "children": [
        {
          "type": "element",
          "tag": "a",
          "props": {
            "href": "#starting-from-h2",
            "aria-hidden": true
          },
          "children": [
            {
              "type": "element",
              "tag": "span",
              "props": {
                "className": [
                  "icon",
                  "icon-link"
                ]
              },
              "children": []
            }
          ]
        },
        {
          "type": "text",
          "value": "Starting from h2"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Some content here"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./partial.md"]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<p>This is paragraph from partial</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is paragraph from partial"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>recursive-partials</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./partial.md"]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<p>This is paragraph from partial</p>
<p>This is paragraph from partial1</p>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is paragraph from partial"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is paragraph from partial1"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials-bad-node</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./partial.md"]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<p>Hello</p>
<div>Unclosed macro: note</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Hello"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Unclosed macro: note"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials-parent-bad-node</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./partial.md"]

[note]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<p>This is paragraph from partial</p>
<div>Unclosed macro: note</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is paragraph from partial"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Unclosed macro: note"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials-broken-ref</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./partial.md"]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<div>Broken partial reference ./partial.md</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "Broken partial reference ./partial.md"
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials-codeblock</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./user.json", codeblock="true"]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<div class="dimer-highlight">
    <pre class="language-json line-numbers"><code>{ "username": "virk" }
</code></pre>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "dimer-highlight"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "pre",
          "props": {
            "className": [
              "language-json",
              "line-numbers"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "code",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "{ \"username\": \"virk\" }\n"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials-codeblock-language</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./user.json", codeblock="true", language="jsonb"]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<div class="dimer-highlight">
    <pre class="language-jsonb line-numbers"><code>{ "username": "virk" }
</code></pre>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "dimer-highlight"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "pre",
          "props": {
            "className": [
              "language-jsonb",
              "line-numbers"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "code",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "{ \"username\": \"virk\" }\n"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials-codeblock-linehighlight</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./user.json", codeblock="true", lineHighlight="1-3"]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<div class="dimer-highlight">
    <pre class="language-json line-numbers" data-line="1-3"><code>{ "username": "virk" }
</code></pre>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "dimer-highlight"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "pre",
          "props": {
            "className": [
              "language-json",
              "line-numbers"
            ],
            "dataLine": "1-3"
          },
          "children": [
            {
              "type": "element",
              "tag": "code",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "{ \"username\": \"virk\" }\n"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials-codeblock-displayname</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[include path="./user.json", codeblock="true", displayName="response"]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<div class="dimer-highlight"><span class="filename">response</span>
    <pre class="language-json line-numbers"><code>{ "username": "virk" }
</code></pre>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "dimer-highlight"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "span",
          "props": {
            "className": [
              "filename"
            ]
          },
          "children": [
            {
              "type": "text",
              "value": "response"
            }
          ]
        },
        {
          "type": "element",
          "tag": "pre",
          "props": {
            "className": [
              "language-json",
              "line-numbers"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "code",
              "props": {},
              "children": [
                {
                  "type": "text",
                  "value": "{ \"username\": \"virk\" }\n"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>partials-codeblock-codegroup</summary>
<h3>Markdown</h3>

````md
This is a paragraph

[codegroup]

[include path="./user.json", codeblock="true", displayName="response"]

[/codegroup]
````

<h3>Html</h3>

```html
<p>This is a paragraph</p>
<div class="tabs">
    <div class="tab-head">
        <ul>
            <li data-title="tab-1">response</li>
        </ul>
    </div>
    <div class="tab-body">
        <div class="tab-item" id="tab-1">
            <div class="dimer-highlight"><span class="filename">response</span>
                <pre class="language-json line-numbers"><code>{ "username": "virk" }
</code></pre>
            </div>
        </div>
    </div>
</div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    },
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "tabs"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-head"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "ul",
              "props": {},
              "children": [
                {
                  "type": "element",
                  "tag": "li",
                  "props": {
                    "dataTitle": "tab-1"
                  },
                  "children": [
                    {
                      "type": "text",
                      "value": "response"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "element",
          "tag": "div",
          "props": {
            "className": [
              "tab-body"
            ]
          },
          "children": [
            {
              "type": "element",
              "tag": "div",
              "props": {
                "className": [
                  "tab-item"
                ],
                "id": "tab-1"
              },
              "children": [
                {
                  "type": "element",
                  "tag": "div",
                  "props": {
                    "className": [
                      "dimer-highlight"
                    ]
                  },
                  "children": [
                    {
                      "type": "element",
                      "tag": "span",
                      "props": {
                        "className": [
                          "filename"
                        ]
                      },
                      "children": [
                        {
                          "type": "text",
                          "value": "response"
                        }
                      ]
                    },
                    {
                      "type": "element",
                      "tag": "pre",
                      "props": {
                        "className": [
                          "language-json",
                          "line-numbers"
                        ]
                      },
                      "children": [
                        {
                          "type": "element",
                          "tag": "code",
                          "props": {},
                          "children": [
                            {
                              "type": "text",
                              "value": "{ \"username\": \"virk\" }\n"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>video</summary>
<h3>Markdown</h3>

````md
[video url="https://www.youtube.com/watch?v=xKwHGewa9Fg"]
````

<h3>Html</h3>

```html
<div class="embed video"><video>
        <source src="https://www.youtube.com/watch?v=xKwHGewa9Fg" type="video/mp4"></video></div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "embed",
          "video"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "video",
          "props": {},
          "children": [
            {
              "type": "element",
              "tag": "source",
              "props": {
                "src": "https://www.youtube.com/watch?v=xKwHGewa9Fg",
                "type": "video/mp4"
              },
              "children": []
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
<details>
<summary>video-attributes</summary>
<h3>Markdown</h3>

````md
[video url="https://www.youtube.com/watch?v=xKwHGewa9Fg", autoplay, poster="foo.jpg"]
````

<h3>Html</h3>

```html
<div class="embed video"><video poster="foo.jpg" autoplay>
        <source src="https://www.youtube.com/watch?v=xKwHGewa9Fg" type="video/mp4"></video></div>
```

<h3>JSON</h3>
<pre><code>{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "div",
      "props": {
        "className": [
          "embed",
          "video"
        ]
      },
      "children": [
        {
          "type": "element",
          "tag": "video",
          "props": {
            "autoplay": true,
            "poster": "foo.jpg"
          },
          "children": [
            {
              "type": "element",
              "tag": "source",
              "props": {
                "src": "https://www.youtube.com/watch?v=xKwHGewa9Fg",
                "type": "video/mp4"
              },
              "children": []
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

</details>
