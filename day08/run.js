const fs = require('fs')
const m = require('.')

fs.readFile('./day08/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.numberOfLitPixels(data.toString()))
})
