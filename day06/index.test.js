const {EOL} = require('os')
const m = require('.')
const test = require('ava')

const {getCorrectedMessage, getCharacterPosCount, getMessages, getMostPopularLetter} = m

test('getCorrectedMessage', t => {
  const input = [
    'eedadn',
    'drvtee',
    'eandsr',
    'raavrd',
    'atevrs',
    'tsrnev',
    'sdttsa',
    'rasrtv',
    'nssdts',
    'ntnada',
    'svetve',
    'tesnvt',
    'vntsnd',
    'vrdear',
    'dvrsen',
    'enarar'
  ].join(EOL)

  t.is(getCorrectedMessage(input), 'easter')
})

test('getCharacterPosCount handles initial case', t => {
  const expected = {
    0: {
      e: 1
    },
    1: {
      e: 1
    },
    2: {
      d: 1
    },
    3: {
      a: 1
    },
    4: {
      d: 1
    },
    5: {
      n: 1
    }
  }

  t.deepEqual(getCharacterPosCount('eedadn', {}), expected)
})

test('getCharacterPosCount handles next case', t => {
  const previous = {
    0: {
      e: 1
    },
    1: {
      e: 1
    },
    2: {
      d: 1
    },
    3: {
      a: 1
    },
    4: {
      d: 1
    },
    5: {
      n: 1
    }
  }

  const expected = {
    0: {
      e: 1,
      f: 1
    },
    1: {
      e: 2
    },
    2: {
      d: 2
    },
    3: {
      a: 2
    },
    4: {
      d: 2
    },
    5: {
      n: 2
    }
  }

  t.deepEqual(getCharacterPosCount('fedadn', previous), expected)
})

test('getMessages', t => {
  t.deepEqual(getMessages(`eedadn${EOL}drvtee${EOL}`), ['eedadn', 'drvtee'])
})

test('getMostPopularLetter', t => {
  t.is(getMostPopularLetter({e: 3, a: 4}), 'a')
})
