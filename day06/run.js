const fs = require('fs')
const m = require('.')

fs.readFile('./day06/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.getCorrectedMessage(data.toString(), m.getMostPopularLetter))
  console.log(m.getCorrectedMessage(data.toString(), m.getLeastPopularLetter))
})
