const {EOL} = require('os')

module.exports = {
  decryptName(encryptedName, rotateTimes) {
    return encryptedName.split('')
      .map(letter => module.exports.shiftCharacter(letter, rotateTimes))
      .join('')
  },
  getNorthSectorId(rooms) {
    return module.exports.getValidRooms(rooms)
      .map(({encryptedName, sectorId}) => ({
        sectorId,
        name: module.exports.decryptName(encryptedName, sectorId)
      }))
      .filter(room => room.name.includes('north'))
      .map(({sectorId}) => sectorId)[0]
  },
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
  shiftCharacter(character, rotateTimes) {
    if (character === '-') {
      return ' '
    }

    const aCharCode = 'a'.charCodeAt(0)
    const zCharCode = 'z'.charCodeAt(0)

    const charCode = character.charCodeAt(0)

    const remainingRotates = rotateTimes % 26

    if (charCode + remainingRotates > zCharCode) {
      return String.fromCharCode(aCharCode + remainingRotates - (zCharCode - charCode + 1))
    }

    return String.fromCharCode(charCode + remainingRotates)
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
