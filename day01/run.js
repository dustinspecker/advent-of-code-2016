const fs = require('fs')
const m = require('.')

fs.readFile('./day01/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.numberOfBlocksAway(data.toString()))
  console.log(m.numberOfBlocksAwayForLocationVisitedTwice(data.toString()))
})
