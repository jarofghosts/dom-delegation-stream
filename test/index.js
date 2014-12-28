var dom = require('dom-sandbox')
  , test = require('tape')

var events = require('../')

test('streams delegated dom events', function(t) {
  t.plan(1)

  var el = dom()
  var stream = events(el, 'click', 'input[type=button]')
  var target = document.createElement('input')

  target.type = 'button'

  el.appendChild(target)

  stream.once('data', function(ev) {
    t.equal(ev.target, target)
  })

  target.click()
})

test('streams direct dom events', function(t) {
  t.plan(1)

  var el = dom()
  var target = document.createElement('input')
  var stream = events(target, 'click')

  target.type = 'button'

  el.appendChild(target)

  stream.once('data', function(ev) {
    t.equal(ev.target, target)
  })

  target.click()
})

test('stops propagation if specified', function(t) {
  var el = dom()
  var target = document.createElement('input')
  var directStream = events(target, 'click', {stopPropagation: true})
  var delegateStream = events(el, 'click', 'input[type=text]')

  target.type = 'button'

  el.appendChild(target)

  directStream.once('data', function(ev) {
    t.equal(ev.target, target)
  })

  delegateStream.once('data', function() {
    t.fail('should not be triggered')
  })

  setTimeout(t.end.bind(t), 100)

  target.click()
})
