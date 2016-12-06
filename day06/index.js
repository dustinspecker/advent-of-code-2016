const {EOL} = require('os')

module.exports = {
  getCorrectedMessage(input) {
    const messages = module.exports.getMessages(input)

    const characterPosCount = messages.reduce((map, message) =>
      module.exports.getCharacterPosCount(message, map)
    , {})

    return Object.keys(characterPosCount).reduce((correctedMessage, index) =>
      correctedMessage + module.exports.getMostPopularLetter(characterPosCount[index])
    , '')
  },
  getCharacterPosCount(string, previousCharacterPosCount) {
    return string.split('').reduce((characterPosCount, letter, index) => {
      if (!(index in characterPosCount)) {
        characterPosCount[index] = {}
      }

      if (characterPosCount[index][letter]) {
        characterPosCount[index][letter]++
      } else {
        characterPosCount[index][letter] = 1
      }

      return characterPosCount
    }, previousCharacterPosCount)
  },
  getMessages(input) {
    return input
      .split(EOL)
      .filter(str => str)
  },
  getMostPopularLetter(characterCountMap) {
    return Object.keys(characterCountMap).reduce((currentBest, letter) => {
      if (characterCountMap[letter] > currentBest.count) {
        currentBest.letter = letter
        currentBest.count = characterCountMap[letter]
      }

      return currentBest
    }, {count: -Infinity})
    .letter
  }
}
