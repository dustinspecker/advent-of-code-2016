const {EOL} = require('os')
const {getInstructions, initializeGrid, numberOfLitPixels, rect, rotateColumn, rotateRow} = require('.')
const test = require('ava')

test('getInstructions', t => {
  const expected = [
    {
      type: 'rect',
      width: 3,
      height: 2
    },
    {
      type: 'rotateColumn',
      column: 1,
      by: 1
    },
    {
      type: 'rotateRow',
      row: 0,
      by: 4
    }
  ]

  const instructions = `rect 3x2${EOL}rotate column x=1 by 1${EOL}rotate row y=0 by 4${EOL}`

  t.deepEqual(getInstructions(instructions), expected)
})

test('getInstructions handles mutli-length numbers', t => {
  const expected = [
    {
      type: 'rect',
      width: 33,
      height: 22
    },
    {
      type: 'rotateColumn',
      column: 11,
      by: 11
    },
    {
      type: 'rotateRow',
      row: 10,
      by: 40
    }
  ]

  const instructions = `rect 33x22${EOL}rotate column x=11 by 11${EOL}rotate row y=10 by 40${EOL}`

  t.deepEqual(getInstructions(instructions), expected)
})

test('initializeGrid', t => {
  const grid = initializeGrid()

  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 6; j++) {
      t.is(grid[`x${i}y${j}`], '.')
    }
  }
})

test('numberOfLitPixels', t => {
  const instructions = `rect 3x2${EOL}rotate column x=1 by 1${EOL}rotate row y=0 by 4${EOL}`

  t.is(numberOfLitPixels(instructions), 6)
})

test('rect', t => {
  const grid = rect(initializeGrid(), 3, 2)

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      t.is(grid[`x${i}y${j}`], '#')
    }

    for (let j = 2; j < 6; j++) {
      t.is(grid[`x${i}y${j}`], '.')
    }
  }

  for (let i = 3; i < 50; i++) {
    for (let j = 0; j < 6; j++) {
      t.is(grid[`x${i}y${j}`], '.')
    }
  }
})

test('rotateColumn', t => {
  const startingGrid = initializeGrid()
  startingGrid.x49y4 = '#'
  startingGrid.x49y5 = '#'

  const grid = rotateColumn(startingGrid, 49, 1)

  Object.keys(grid).forEach(key => {
    if (key === 'x49y0' || key === 'x49y5') {
      t.is(grid[key], '#')
    } else {
      t.is(grid[key], '.')
    }
  })
})

test('rotateRow', t => {
  const startingGrid = initializeGrid()
  startingGrid.x48y5 = '#'
  startingGrid.x49y5 = '#'

  const grid = rotateRow(startingGrid, 5, 1)
  Object.keys(grid).forEach(key => {
    if (key === 'x0y5' || key === 'x49y5') {
      t.is(grid[key], '#')
    } else {
      t.is(grid[key], '.')
    }
  })
})
