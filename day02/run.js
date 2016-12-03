const fs = require('fs')
const m = require('.')

fs.readFile('./day02/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.getFirstCode(data.toString()))
})
