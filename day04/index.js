const {EOL} = require('os')

module.exports = {
  parseRooms(rooms) {
    return rooms.split(EOL)
      .filter(str => str)
      .map(room => ({
        encryptedName: (/(.*)-[\D]*/).exec(room)[1],
        /* eslint-disable no-useless-escape */
        checksum: (/\[(.*)\]/).exec(room)[1],
        sectorId: parseInt((/\d+/).exec(room)[0], 10)
      }))
  },
  getLetterMapping(encryptedName) {
    return encryptedName.split('').reduce((mapping, letter) => {
      if (letter === '-') {
        return mapping
      }

      if (mapping[letter]) {
        mapping[letter]++
      } else {
        mapping[letter] = 1
      }

      return mapping
    }, {})
  },
  getValidRooms(rooms) {
    return module.exports.parseRooms(rooms)
      .filter(({encryptedName, checksum}) =>
        module.exports.top5Letters(encryptedName) === checksum
      )
  },
  sumValidRooms(rooms) {
    return module.exports.getValidRooms(rooms).reduce((total, {sectorId}) =>
      total + sectorId
    , 0)
  },
  top5Letters(encryptedName) {
    const mapping = module.exports.getLetterMapping(encryptedName)

    return Object.keys(mapping)
      .sort((a, b) => {
        if (mapping[a] === mapping[b]) {
          return a < b ? -1 : 1
        }

        return mapping[b] - mapping[a]
      })
      .slice(0, 5)
      .join('')
  }
}
