var delegate = require('dom-delegate')
  , through = require('through')

module.exports = delegateStream

function delegateStream(el, type, selector, _options) {
  var options = _options || {}
  var stream = through(null, end)
  var delegator = delegate(el)

  if(!selector || typeof selector !== 'string') {
    options = selector || {}

    delegator.on(type, handler, options.useCapture)
  } else {
    delegator.on(type, selector, handler, options.useCapture)
  }

  return stream

  function handler(ev) {
    if(options.preventDefault) ev.preventDefault()
    if(options.stopPropagation) ev.stopPropagation()

    stream.queue(ev)
  }

  function end() {
    delegator.off()
  }
}
