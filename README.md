## aframe-bring-to-front-component

[![Version](http://img.shields.io/npm/v/aframe-bring-to-front-component.svg?style=flat-square)](https://npmjs.org/package/aframe-bring-to-front-component)
[![License](http://img.shields.io/npm/l/aframe-bring-to-front-component.svg?style=flat-square)](https://npmjs.org/package/aframe-bring-to-front-component)

A A-Frame Bring To Front Component component for A-Frame.

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-bring-to-front-component/dist/aframe-bring-to-front-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity bring-to-front="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-bring-to-front-component
```

Then require and use.

```js
require('aframe');
require('aframe-bring-to-front-component');
```
