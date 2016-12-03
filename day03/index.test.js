const {EOL} = require('os')
const m = require('.')
const test = require('ava')

const {parseDimensionsByColumn, parseDimensionsByRow, numberOfValidTriangles, triangleIsValid} = m

test('numberOfValidTriangles', t => {
  const dimensions = ` 33 42 56${EOL}5 4 7${EOL}  10 5 25`
  t.is(numberOfValidTriangles(dimensions, parseDimensionsByRow), 2)
})

test('parseDimensionsByColumn', t => {
  const expected = [[33, 47, 23], [7, 323, 123], [17, 3, 5]]
  const dimensions = `33 7 17${EOL}47 323 3${EOL}23 123 5`
  t.deepEqual(parseDimensionsByColumn(dimensions), expected)
})

test('parseDimensionsByRow', t => {
  const expected = [[33, 47, 23], [7, 323, 123]]
  t.deepEqual(parseDimensionsByRow(`  33     47   23${EOL}  7  323 123`), expected)
})

test('triangleIsValid', t => {
  t.is(triangleIsValid([5, 10, 25]), false)
  t.is(triangleIsValid([5, 10, 8]), true)
})
