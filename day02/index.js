const {EOL} = require('os')
const Node = require('./node')

const letterDirection = {
  U: 'up',
  R: 'right',
  D: 'down',
  L: 'left'
}

module.exports = {
  getCode(path) {
    const steps = module.exports.parsePath(path)

    const n1 = new Node('1')
    const n2 = new Node('2')
    const n3 = new Node('3')
    const n4 = new Node('4')
    const n5 = new Node('5')
    const n6 = new Node('6')
    const n7 = new Node('7')
    const n8 = new Node('8')
    const n9 = new Node('9')

    n1.right = n2
    n1.down = n4

    n2.right = n3
    n2.down = n5
    n2.left = n1

    n3.down = n6
    n3.left = n2

    n4.up = n1
    n4.right = n5
    n4.down = n7

    n5.up = n2
    n5.right = n6
    n5.down = n8
    n5.left = n4

    n6.up = n3
    n6.down = n9
    n6.left = n5

    n7.up = n4
    n7.right = n8

    n8.up = n5
    n8.right = n9
    n8.left = n7

    n9.up = n6
    n9.left = n8

    let currentNode = n5
      , code = ''

    for (const step of steps) {
      for (const instruction of step) {
        currentNode = currentNode.move(instruction)
      }

      code += currentNode.key
    }

    return code
  },
  parsePath(path) {
    const steps = path.split(EOL)
      .map(instruction =>
        instruction.split('')
          .map(letter => letterDirection[letter])
      )

    return steps.slice(0, steps.length - 1)
  }
}
