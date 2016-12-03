const m = require('.')
const test = require('ava')

const {getNewDirection, getNewXY, numberOfBlocksAway, numberOfBlocksAwayForLocationVisitedTwice, parsePath} = m

test('getNewDirection handles turning from existing', t => {
  t.is(getNewDirection('north', 'right'), 'east')
  t.is(getNewDirection('north', 'left'), 'west')
  t.is(getNewDirection('east', 'right'), 'south')
  t.is(getNewDirection('east', 'left'), 'north')
  t.is(getNewDirection('south', 'right'), 'west')
  t.is(getNewDirection('south', 'left'), 'east')
  t.is(getNewDirection('west', 'right'), 'north')
  t.is(getNewDirection('west', 'left'), 'south')
})

test('getNewXY', t => {
  t.deepEqual(getNewXY(0, 0, 'north'), {x: 0, y: 1})
  t.deepEqual(getNewXY(0, 0, 'east'), {x: 1, y: 0})
  t.deepEqual(getNewXY(0, 0, 'south'), {x: 0, y: -1})
  t.deepEqual(getNewXY(0, 0, 'west'), {x: -1, y: 0})
})

test('parsePath returns empty []', t => {
  t.deepEqual(parsePath(), [])
  t.deepEqual(parsePath(''), [])
})

test('parsePath handles single steps', t => {
  t.deepEqual(parsePath('L4'), [{turningDirection: 'left', blocks: 4}])
  t.deepEqual(parsePath('R123'), [{turningDirection: 'right', blocks: 123}])
})

test('parsePath handles multiple steps', t => {
  const expectedSteps = [
    {
      turningDirection: 'left',
      blocks: 17
    },
    {
      turningDirection: 'right',
      blocks: 124
    },
    {
      turningDirection: 'right',
      blocks: 5
    }
  ]

  t.deepEqual(parsePath('L17, R124, R5'), expectedSteps)
})

test('numberOfBlocksAway', t => {
  t.is(numberOfBlocksAway('R2, L3'), 5)
  t.is(numberOfBlocksAway('R2, R2, R2'), 2)
  t.is(numberOfBlocksAway('R5, L5, R5, R3'), 12)
})
