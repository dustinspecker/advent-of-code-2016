const fs = require('fs')
const m = require('.')

fs.readFile('./day10/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.whichBotComparesChips(data.toString(), 17, 61))
  const factory = m.whichBotComparesChips(data.toString())
  console.log(factory.output0.chips[0] * factory.output1.chips[0] * factory.output2.chips[0])
})
