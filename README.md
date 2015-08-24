# dom-delegation-stream

[![Build Status](https://img.shields.io/travis/jarofghosts/dom-delegation-stream.svg?style=flat-square)](https://travis-ci.org/jarofghosts/dom-delegation-stream)
[![npm install](https://img.shields.io/npm/dm/dom-delegation-stream.svg?style=flat-square)](https://www.npmjs.org/package/dom-delegation-stream)
[![npm version](https://img.shields.io/npm/v/dom-delegation-stream.svg?style=flat-square)](https://www.npmjs.org/package/dom-delegation-stream)
[![License](https://img.shields.io/npm/l/dom-delegation-stream.svg?style=flat-square)](https://github.com/jarofghosts/dom-delegation-stream/blob/master/LICENSE)

simple streaming DOM event delegation

## example

```javascript
var events = require('dom-delegation-stream')
var values = require('dom-value-stream')

events(document.body, 'input', 'input[type=text]')
  .pipe(values())
  .pipe(wherever())
```

## API

#### events(element, eventName[, selector, options]) -> ReadableStream

* if selector is provided, delegation will be used, otherwise it will not.
* valid options are:
  - `preventDefault <boolean>`: will call `preventDefault()` on all matched
  events. Defaults to `false`.
  - `stopPropagation <boolean>`: will call `stopPropagation()` on all matched
  events. Defaults to `false`.
  - `useCapture <boolean>`: will initiate capture for matched events. Defaults
  to `false`.

## notes

* when using delegation, the element that matches your selector will be
  available as `event.delegationTarget`.
* calling `.end()` or otherwise ending the stream returned by
  `dom-delegation-stream` will remove the listeners added for event handling.
* there are some alternative options for event handling on npm, a couple that
  even support delegation, and even some that are streaming. this module was
  created as an effort to provide a better balance of simplicity and
  flexibility.

## license

MIT
