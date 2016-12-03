const fs = require('fs')
const m = require('.')

fs.readFile('./day03/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.numberOfValidTriangles(data.toString(), m.parseDimensionsByRow))
})
