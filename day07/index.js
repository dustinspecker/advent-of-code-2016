const {EOL} = require('os')

const is4CharsAbba = string =>
    string[0] !== string[1] && string[0] === string[3] && string[1] === string[2]

module.exports = {
  getIPs(input) {
    return input
      .split(EOL)
      .filter(str => str)
  },
  isABBA(string) {
    for (let i = 0; i <= string.length - 4; i++) {
      if (is4CharsAbba(string.slice(i, i + 4))) {
        return true
      }
    }

    return false
  },
  ipSupportsTLS(ip) {
    const {hypernets, supernets} = module.exports.parseIp(ip)

    const {isABBA} = module.exports

    return hypernets.every(word => !isABBA(word)) && supernets.some(word => isABBA(word))
  },
  numberOfIpsSupportingTLS(input) {
    const ips = module.exports.getIPs(input)

    return ips.reduce((total, ip) => {
      if (module.exports.ipSupportsTLS(ip)) {
        return total + 1
      }

      return total
    }, 0)
  },
  parseIp(ip) {
    return ip.match(/(\w*)/g).reduce((parsedIp, word) => {
      if (!word) {
        return parsedIp
      }

      if (parsedIp.supernets.length <= parsedIp.hypernets.length) {
        parsedIp.supernets.push(word)
      } else {
        parsedIp.hypernets.push(word)
      }

      return parsedIp
    }, {hypernets: [], supernets: []})
  }
}
