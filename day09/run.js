const fs = require('fs')
const m = require('.')

fs.readFile('./day09/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.decompress(data.toString()).length - 1)
})
