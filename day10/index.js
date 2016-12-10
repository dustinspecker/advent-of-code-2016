const {EOL} = require('os')

module.exports = {
  giveValue(factory, value, {type, number}) {
    const key = `${type}${number}`
    if (factory[key]) {
      factory[key].chips.push(value)
    } else {
      factory[key] = {
        chips: [value]
      }
    }

    return factory
  },
  parseInstructions(input) {
    return input.split(EOL)
      .filter(str => str)
      .map(instruction => {
        const words = instruction.split(' ')

        if (words[0] === 'value') {
          return {
            type: 'value',
            value: parseInt(words[1], 10),
            to: {
              type: words[4],
              number: parseInt(words[5], 10)
            }
          }
        }

        return {
          type: 'gives',
          bot: parseInt(words[1], 10),
          low: {
            type: words[5],
            number: parseInt(words[6], 10)
          },
          high: {
            type: words[10],
            number: parseInt(words[11], 10)
          }
        }
      })
  },
  removeValues(factory, botNumber) {
    const [low, high] = factory[`bot${botNumber}`].chips.sort((a, b) => a > b)

    factory[`bot${botNumber}`].chips = []

    return {factory, low, high}
  },
  whichBotComparesChips(input, expectedLow, expectedHigh) {
    let factory = {}
    const instructions = module.exports.parseInstructions(input)

    instructions.forEach(instruction => {
      if (instruction.type === 'value') {
        module.exports.giveValue(factory, instruction.value, instruction.to)
      }
    })

    /* eslint-disable no-constant-condition */
    while (true) {
      for (const instruction of instructions) {
        const key = `bot${instruction.bot}`
        if (instruction.type === 'gives' && factory[key] && factory[key].chips.length === 2) {
          const {factory: newFactory, low, high} = module.exports.removeValues(factory, instruction.bot)

          if (low === expectedLow && high === expectedHigh) {
            return instruction.bot
          }

          factory = newFactory
          module.exports.giveValue(factory, low, instruction.low)
          module.exports.giveValue(factory, high, instruction.high)
        }
      }
    }
  }
}
