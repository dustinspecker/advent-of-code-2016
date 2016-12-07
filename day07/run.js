const fs = require('fs')
const m = require('.')

fs.readFile('./day07/input.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log(m.numberOfIpsSupportingTLS(data.toString()))
})
