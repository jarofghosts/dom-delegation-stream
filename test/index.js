var test = require('tape')

var events = require('../')

test('streams delegated dom events', function(t) {
  t.plan(1)

  var el = document.createElement('div')
  var stream = events(el, 'click', 'input[type=button]')
  var target = document.createElement('input')

  document.body.appendChild(el)

  target.type = 'button'

  el.appendChild(target)

  stream.on('data', function(ev) {
    t.equal(ev.target, target)
  })

  target.click()
})

test('streams direct dom events', function(t) {
  t.plan(1)

  var el = document.createElement('div')
  var target = document.createElement('input')
  var stream = events(target, 'click')

  document.body.appendChild(el)

  target.type = 'button'

  el.appendChild(target)

  stream.on('data', function(ev) {
    t.equal(ev.target, target)
  })

  target.click()
})

test('stops propagation if specified', function(t) {
  t.plan(1)

  var el = document.createElement('div')
  var target = document.createElement('input')
  var directStream = events(target, 'click', {stopPropagation: true})
  var delegateStream = events(el, 'click', 'input[type=button]')

  document.body.appendChild(el)

  target.type = 'button'

  el.appendChild(target)

  directStream.once('data', function(ev) {
    t.equal(ev.target, target)
    t.end()
  })

  delegateStream.once('data', function() {
    t.fail('should not be triggered')
  })

  target.click()
})

test('`.end()` removes listeners', function(t) {
  t.plan(1)

  var el = document.createElement('div')
  var target = document.createElement('input')
  var directStream = events(target, 'click', {stopPropagation: true})
  var delegateStream = events(el, 'click', 'input[type=button]')

  document.body.appendChild(el)

  target.type = 'button'

  el.appendChild(target)

  directStream.once('data', function() {
    t.fail('should not be triggered')
  })

  delegateStream.once('data', function() {
    t.ok(true, 'should be triggered')
    t.end()
  })

  directStream.end()

  target.click()
})
