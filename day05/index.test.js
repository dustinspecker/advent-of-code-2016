const m = require('.')
const test = require('ava')

const {getHash, getPassword, getSecondPassword, hashHasPrefix} = m

test('getHash', t => {
  t.is(getHash('abc3231929'), '00000155f8105dff7f56ee10fa9b9abd')
})

test('getPassword', t => {
  t.is(getPassword('abc', 2), '18')
})

test('getSecondPassword', t => {
  t.is(getSecondPassword('abc', 8), '05ace8e3')
})

test('hashHasPrefix', t => {
  t.is(hashHasPrefix('00000155f8105dff7f56ee10fa9b9abd', '00000'), true)
  t.is(hashHasPrefix('10000155f8105dff7f56ee10fa9b9abd', '00000'), false)
})
