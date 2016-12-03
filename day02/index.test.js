const {EOL} = require('os')
const m = require('.')
const test = require('ava')

const {getFirstCode, parsePath} = m

test('getFirstCode', t => {
  const path = `ULL${EOL}RRDDD${EOL}LURDL${EOL}UUUUD${EOL}`

  t.is(getFirstCode(path), '1985')
})

test('parsePath', t => {
  t.deepEqual(parsePath(`ULL${EOL}`), [['up', 'left', 'left']])
  t.deepEqual(parsePath(`RD${EOL}UL${EOL}`), [['right', 'down'], ['up', 'left']])
})
