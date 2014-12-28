var delegate = require('delegate-dom')
  , direct = require('dom-event')
  , through = require('through')

module.exports = delegateStream

function delegateStream(el, type, selector, _options) {
  var options = _options || {}
  var stream = through()

  if(!selector || typeof selector !== 'string') {
    options = selector || {}

    direct(el, type, handler, options.useCapture)
  } else {
    delegate.on(el, selector, type, handler, options.useCapture)
  }

  return stream

  function handler(ev) {
    if(options.preventDefault) ev.preventDefault()
    if(options.stopPropagation) ev.stopPropagation()

    stream.queue(ev)
  }
}
