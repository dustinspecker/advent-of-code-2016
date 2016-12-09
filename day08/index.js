const {EOL} = require('os')

module.exports = {
  initializeGrid() {
    const grid = {}

    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 6; j++) {
        grid[`x${i}y${j}`] = '.'
      }
    }

    return grid
  },
  getInstructions(input) {
    return input.split(EOL)
      .filter(str => str)
      .map(instruction => {
        const words = instruction.split(' ')

        if (words[0] === 'rect') {
          const [width, height] = words[1].split('x').map(n => parseInt(n, 10))

          return {
            type: 'rect',
            width,
            height
          }
        }

        if (words[1] === 'column') {
          const column = parseInt(words[2].slice(2, words[2].length), 10)

          return {
            type: 'rotateColumn',
            column,
            by: parseInt(words[4], 10)
          }
        }

        const row = parseInt(words[2].slice(2, words[2].length), 10)

        return {
          type: 'rotateRow',
          row,
          by: parseInt(words[4], 10)
        }
      })
  },
  numberOfLitPixels(input) {
    let grid = module.exports.initializeGrid(50, 6)
    const instructions = module.exports.getInstructions(input)

    instructions.forEach(instruction => {
      if (instruction.type === 'rect') {
        grid = module.exports.rect(grid, instruction.width, instruction.height)
      } else if (instruction.type === 'rotateColumn') {
        grid = module.exports.rotateColumn(grid, instruction.column, instruction.by)
      } else {
        grid = module.exports.rotateRow(grid, instruction.row, instruction.by)
      }
    })

    module.exports.printGrid(grid)

    return Object.keys(grid).reduce((total, key) => {
      if (grid[key] === '#') {
        return total + 1
      }

      return total
    }, 0)
  },
  printGrid(grid) {
    for (let i = 0; i < 6; i++) {
      let str = ''
      for (let j = 0; j < 50; j++) {
        str += grid[`x${j}y${i}`]
        if (j % 5 === 4) {
          str += '   '
        }
      }

      console.log(`${str}${EOL}`)
    }
  },
  rect(grid, width, height) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        grid[`x${i}y${j}`] = '#'
      }
    }

    return grid
  },
  rotateColumn(grid, column, by) {
    const oldValues = Object.keys(grid).reduce((values, key) => {
      if (key.includes(`x${column}`)) {
        values.push(grid[key])
      }

      return values
    }, [])

    for (let i = 0; i < 6; i++) {
      let index = i - by
      if (index < 0) {
        index += 6
      }

      grid[`x${column}y${i}`] = oldValues[index]
    }

    return grid
  },
  rotateRow(grid, row, by) {
    const oldValues = Object.keys(grid).reduce((values, key) => {
      if (key.includes(`y${row}`)) {
        values.push(grid[key])
      }

      return values
    }, [])

    for (let i = 0; i < 50; i++) {
      let index = i - by
      if (index < 0) {
        index += 50
      }

      grid[`x${i}y${row}`] = oldValues[index]
    }

    return grid
  }
}
