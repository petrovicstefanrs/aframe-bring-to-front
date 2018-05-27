## aframe-bring-to-front-component

[![Version](http://img.shields.io/npm/v/aframe-bring-to-front-component.svg?style=flat-square)](https://npmjs.org/package/aframe-bring-to-front-component)
[![License](http://img.shields.io/npm/l/aframe-bring-to-front-component.svg?style=flat-square)](https://npmjs.org/package/aframe-bring-to-front-component)

A-Frame Bring To Front Component component For [A-Frame](https://aframe.io).
This component serves as a wrapper around any other element and listens to an event to know when to put the wrapped element in front of the camera.

IMPORTANT: For this component to work you must have a camera element explicitly declared somwhere inside your scene element.

Insipred and based on [A-Frame Modal Component](https://github.com/IdeaSpaceVR/aframe-ui-modal-component).

### API

| Property       | Description                                                                         | Default Value    |
| -------------- | ----------------------------------------------------------------------------------- | ---------------- |
| trigger        | Event to put element to front                                                       | keydown          |
| triggerElement | Element to which the trigger event listener will be applied.                        | a-scene          |
| distance       | Distance of the element from the camera on the z-axis. In meters.                   | -1               |
| keyCode        | If event is keydown or keyup event will be fired if this key is pressed Default (H) | 72               |
| source         | Source element to act as a pivot for the object we want to put in front             | a-entity[camera] |

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
  <a-entity position="0 1.6 0">
      <a-entity camera></a-entity>
  </a-entity>
  <a-scene>
    <a-entity bring-to-front>
      <a-box position="0 2 -3"></a-box>
    </a-entity>
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
