# dom-delegation-stream

simple streaming DOM event delegation

## example

```javascript
var events = require('dom-delegation-stream')
  , values = require('dom-value-stream')

events(document.body, 'input', 'input[type=text]')
  .pipe(values())
  .pipe(wherever())
```

## api

#### events(element, eventName[, selector, options]) -> ReadableStream

* if selector is provided, delegation will be used.
* valid options are:
  - `preventDefault : boolean`: will call `preventDefault()` on all matched
  events. Defaults to `false`.
  - `stopPropagation : boolean`: will call `stopPropagation()` on all matched
  events. Defaults to `false`.
  - `useCapture : boolean`: if specified, will initiate capture for matched
  events. Defaults to `false`.

## notes

* there are some alternative options for event handling on npm, a couple that
  even support delegation, and even some that are streaming. this module was
  created as an effort to provide a better balance of simplicity and
  flexibility.

## license

MIT
