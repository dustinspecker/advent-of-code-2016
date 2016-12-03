const Node = require('./node')
const test = require('ava')

test('Node is initialized with key and null siblings', t => {
  const node = new Node('1')

  t.is(node.key, '1')
  t.is(node.up, null)
  t.is(node.right, null)
  t.is(node.down, null)
  t.is(node.left, null)
})

test('Node can be initialized with siblings', t => {
  const up = new Node()
  const right = new Node()
  const down = new Node()
  const left = new Node()

  const node = new Node('4', {up, right, down, left})

  t.is(node.up, up)
  t.is(node.right, right)
  t.is(node.down, down)
  t.is(node.left, left)
})

test('move returns self if nothing exists in that direction', t => {
  const node = new Node()

  t.is(node.move('up'), node)
  t.is(node.move('right'), node)
  t.is(node.move('down'), node)
  t.is(node.move('left'), node)
})

test('move returns node in that direction', t => {
  const up = new Node()
  const right = new Node()
  const down = new Node()
  const left = new Node()

  const node = new Node('4', {up, right, down, left})

  t.is(node.move('up'), up)
  t.is(node.move('right'), right)
  t.is(node.move('down'), down)
  t.is(node.move('left'), left)
})
