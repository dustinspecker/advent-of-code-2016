const crypto = require('crypto')

const passwordIsComplete = str => str.replace(' ', '').length === str.length

module.exports = {
  getHash(str) {
    return crypto.createHash('md5')
      .update(str)
      .digest('hex')
  },
  getPassword(doorId, passwordLength) {
    let password = ''

    for (let i = 0; password.length < passwordLength; i++) {
      const hash = module.exports.getHash(doorId + i)

      if (module.exports.hashHasPrefix(hash, '00000')) {
        password += hash[5]
      }
    }

    return password
  },
  getSecondPassword(doorId, passwordLength) {
    let password = ''
    for (let i = 0; i < passwordLength; i++) {
      password += ' '
    }

    for (let i = 0; !passwordIsComplete(password); i++) {
      const hash = module.exports.getHash(doorId + i)

      if (module.exports.hashHasPrefix(hash, '00000')) {
        const index = parseInt(hash[5], 10)
        if (index < passwordLength && password[index] === ' ') {
          password = password.substr(0, index) + hash[6] + password.substr(index + 1)
        }
      }
    }

    return password
  },
  hashHasPrefix(hash, prefix) {
    return hash.startsWith(prefix)
  }
}
