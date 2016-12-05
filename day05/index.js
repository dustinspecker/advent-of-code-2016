const crypto = require('crypto')

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
  hashHasPrefix(hash, prefix) {
    return hash.startsWith(prefix)
  }
}
