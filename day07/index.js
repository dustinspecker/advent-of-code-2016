const {EOL} = require('os')

const is4CharsAbba = string =>
    string[0] !== string[1] && string[0] === string[3] && string[1] === string[2]

module.exports = {
  abaFoundInBabs(aba, babs) {
    const bab = `${aba[1]}${aba[0]}${aba[1]}`

    return babs.includes(bab)
  },
  getABAs(ip) {
    const abas = []
    for (let i = 0; i <= ip.length - 3; i++) {
      if (ip[i] === ip[i + 2] && ip[i] !== ip[i + 1]) {
        abas.push(ip.slice(i, i + 3))
      }
    }

    return abas
  },
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
  ipSupportsSSL(ip) {
    const {hypernets, supernets} = module.exports.parseIp(ip)

    const supernetsABAs = supernets.reduce((abas, supernet) => {
      abas.push(...module.exports.getABAs(supernet))

      return abas
    }, [])

    const hypernetsABAs = hypernets.reduce((abas, hypernet) => {
      abas.push(...module.exports.getABAs(hypernet))

      return abas
    }, [])

    return supernetsABAs.some(aba => module.exports.abaFoundInBabs(aba, hypernetsABAs))
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
  numberOfIpsSupportingSSL(input) {
    const ips = module.exports.getIPs(input)

    return ips.reduce((total, ip) => {
      if (module.exports.ipSupportsSSL(ip)) {
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
