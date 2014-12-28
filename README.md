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

### events(element, eventName[, selector, options]) -> ReadableStream

* if selector is provided, delegation will be used.
* valid options are:
  - `preventDefault : boolean`: will call `preventDefault()` on all matched
  events. Defaults to `false`.
  - `stopPropagation : boolean`: will call `stopPropagation()` on all matched
  events. Defaults to `false`.
  - `useCapture : boolean`: if specified, will initiate capture for matched
  events.

## license

MIT
