const {EOL} = require('os')
const {giveValue, parseInstructions, removeValues, whichBotComparesChips} = require('.')
const test = require('ava')

test('giveValue', t => {
  const expectedFactory = {
    bot145: {
      chips: [2]
    }
  }

  t.deepEqual(giveValue({}, 2, {type: 'bot', number: 145}), expectedFactory)

  const expectedFactory2 = {
    bot145: {
      chips: [2, 7]
    }
  }

  t.deepEqual(giveValue(expectedFactory, 7, {type: 'bot', number: 145}), expectedFactory2)
})

test('parseInstructions', t => {
  const expected = [
    {
      type: 'value',
      value: 2,
      to: {
        type: 'bot',
        number: 145
      }
    },
    {
      type: 'gives',
      bot: 7,
      low: {
        type: 'bot',
        number: 19
      },
      high: {
        type: 'output',
        number: 17
      }
    }
  ]

  const instructions = `value 2 goes to bot 145${EOL}bot 7 gives low to bot 19 and high to output 17${EOL}`

  t.deepEqual(parseInstructions(instructions), expected)
})

test('removeValues', t => {
  const factory = {
    bot145: {
      chips: [2, 1]
    }
  }

  const expected = {
    bot145: {
      chips: []
    }
  }

  t.deepEqual(removeValues(factory, 145), {factory: expected, low: 1, high: 2})
})

test('whichBotComparesChips', t => {
  const instructions = [
    'value 5 goes to bot 2',
    'bot 2 gives low to bot 1 and high to bot 0',
    'value 3 goes to bot 1',
    'bot 0 gives low to output 2 and high to output 0',
    'bot 1 gives low to output 1 and high to bot 0',
    'value 2 goes to bot 2'
  ].join(EOL)

  t.is(whichBotComparesChips(instructions, 2, 5), 2)

  t.is(whichBotComparesChips(instructions, 3, 5), 0)
})
