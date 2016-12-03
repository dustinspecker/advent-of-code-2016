const {EOL} = require('os')
const m = require('.')
const test = require('ava')

const {getCode, parsePath} = m

test('getCode', t => {
  const path = `ULL${EOL}RRDDD${EOL}LURDL${EOL}UUUUD${EOL}`

  t.is(getCode(path), '1985')
})

test('parsePath', t => {
  t.deepEqual(parsePath(`ULL${EOL}`), [['up', 'left', 'left']])
  t.deepEqual(parsePath(`RD${EOL}UL${EOL}`), [['right', 'down'], ['up', 'left']])
})
