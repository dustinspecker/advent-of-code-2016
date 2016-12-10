const fs = require('fs')
const m = require('.')

fs.readFile('./day10/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.whichBotComparesChips(data.toString(), 17, 61))
})
