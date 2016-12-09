const {decompress} = require('.')
const test = require('ava')

test('decompress handles no markers', t => {
  t.is(decompress('ADVENT'), 'ADVENT')
})

test('handles repeats', t => {
  t.is(decompress('A(1x5)BC'), 'ABBBBBC')
  t.is(decompress('(3x3)XYZ'), 'XYZXYZXYZ')
  t.is(decompress('(6x1)(1x3)A'), '(1x3)A')
  t.is(decompress('X(8x2)(3x3)ABCY'), 'X(3x3)ABC(3x3)ABCY')
  t.is(decompress('(10x10)1234567890'), '1234567890'.repeat(10))
})
