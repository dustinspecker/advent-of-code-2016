const {EOL} = require('os')
const m = require('.')
const test = require('ava')

const {
  getIPs,
  isABBA,
  ipSupportsTLS,
  numberOfIpsSupportingTLS,
  parseIp
} = m

test('getIPs', t => {
  const input = `abba[mnop]qrst${EOL}abcd[bddb]xyyx${EOL}`

  t.deepEqual(getIPs(input), ['abba[mnop]qrst', 'abcd[bddb]xyyx'])
})

test('isABBA', t => {
  t.is(isABBA('abba'), true)
  t.is(isABBA('aaaa'), false)
  t.is(isABBA('ioxxoj'), true)
  t.is(isABBA('ioxpoj'), false)
})

test('ipSupportsTLS', t => {
  t.is(ipSupportsTLS('abba[mnop]qrst'), true)
  t.is(ipSupportsTLS('abcd[bddb]xyyx'), false)
  t.is(ipSupportsTLS('aaaa[qwer]tyui'), false)
  t.is(ipSupportsTLS('ioxxoj[asdfgh][zxcvbn]'), true)
})

test('numberOfIpsSupportingTLS', t => {
  const input = `abba[mnop]qrst${EOL}abcd[bddb]xyyx${EOL}aaaa[qwer]tyui${EOL}ioxxo[asdfgh]zxcvbn]${EOL}`

  t.is(numberOfIpsSupportingTLS(input), 2)
})

test('parseIp', t => {
  const expected = {
    hypernets: ['mnop'],
    supernets: ['abba', 'qrst']
  }

  t.deepEqual(parseIp('abba[mnop]qrst'), expected)
})
