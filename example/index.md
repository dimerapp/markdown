Very first I have not defined the title of the document and relied on metaData to set it for
me.

Also the idea of this doc is to be a dick and have the most messy markdown here to make sure the parser works fine, no matter how harsh the outside world is

[note]
This is a note
[/note]

1. Ohh wow this is nice, right?


## How about a pen?
[codepen url=https://codepen.io/ge1doot/pen/vRJyVG]

Also you know what, we can add code with filenames in it

```js{}{index.js}
var a = require('a')
a.run()
```

And you can we also highlight some lines

```jsx{1,2,6-8}{index.js}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

Let's try some code groups

[codegroup]
```text{}{Tab no 1}
This is raw text tab 1
```

```text{}{Tab no 2}
This is raw text tab 2
```
[/codegroup]

Since I am a dick, let's drop on empty codegroup

[codegroup]
[/codegroup]

Fuck yes, no impact

How about some headings with links in them

## [Heading](#anchored)
This is h2 and this is anchored

## Youtube.be video?
[youtube url="https://youtu.be/bfk6AzvyX4k", height="300px", width="200px"]

Now I am going to embed an images with link reference

![][logo]

[logo]: https://edge.adonisjs.com/images/edge-colored-logo.svg


The following image must get replaced with the CDN url.

> Holly shit it worked like a fucking charm

![](../images/mug.png)

Also how about doing the same shit but with image reference

![][mug]

[mug]:../images/mug.png

## How about code groups with some normal text in it

[codegroup]
So I start by creating a simple para that explains the following code.

```js
var a = require('a')
```
[/codegroup]
