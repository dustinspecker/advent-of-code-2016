const fs = require('fs')
const m = require('.')

fs.readFile('./day04/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.sumValidRooms(data.toString()))
})
