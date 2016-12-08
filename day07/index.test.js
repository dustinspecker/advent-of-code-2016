const {EOL} = require('os')
const m = require('.')
const test = require('ava')

const {
  abaFoundInBabs,
  getABAs,
  getIPs,
  isABBA,
  ipSupportsSSL,
  ipSupportsTLS,
  numberOfIpsSupportingSSL,
  numberOfIpsSupportingTLS,
  parseIp
} = m

test('abaFoundInBabs', t => {
  t.is(abaFoundInBabs('zaz', ['aza', 'xyx']), true)
  t.is(abaFoundInBabs('zaz', ['zaz', 'xyx']), false)
})

test('getABAs', t => {
  t.deepEqual(getABAs('zazbzaya'), ['zaz', 'zbz', 'aya'])
})

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

test('ipSupportsSSL', t => {
  t.is(ipSupportsSSL('aba[bab]xyx'), true)
  t.is(ipSupportsSSL('xyx[xyx]xyx'), false)
  t.is(ipSupportsSSL('aaa[kek]eke'), true)
  t.is(ipSupportsSSL('zazbz[bzb]cdb'), true)
})

test('ipSupportsTLS', t => {
  t.is(ipSupportsTLS('abba[mnop]qrst'), true)
  t.is(ipSupportsTLS('abcd[bddb]xyyx'), false)
  t.is(ipSupportsTLS('aaaa[qwer]tyui'), false)
  t.is(ipSupportsTLS('ioxxoj[asdfgh][zxcvbn]'), true)
})

test('numberOfIpsSupportingSSL', t => {
  const input = `aba[bab]xyx${EOL}xyx[xyx]xyx${EOL}aaa[kek]eke${EOL}zazbz[bzb]cdb${EOL}`

  t.is(numberOfIpsSupportingSSL(input), 3)
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
