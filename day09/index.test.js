const {decompress} = require('.')
const test = require('ava')

test('decompress handles no markers', t => {
  t.is(decompress('ADVENT'), 6)
})

test('handles repeats', t => {
  t.is(decompress('A(1x5)BC'), 7)
  t.is(decompress('(3x3)XYZ'), 9)
  t.is(decompress('(6x1)(1x3)A'), 6)
  t.is(decompress('X(8x2)(3x3)ABCY'), 18)
  t.is(decompress('(10x10)1234567890'), 100)
})

test('version 2', t => {
  t.is(decompress('(3x3)XYZ', 2), 9)
  t.is(decompress('X(8x2)(3x3)ABCY', 2), 20)
  t.is(decompress('(1x12)A', 2), 12)
  t.is(decompress('(27x12)(20x12)(13x14)(7x10)(1x12)A', 2), 241920)
  t.is(decompress('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN', 2), 445)
})
