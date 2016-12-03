const directionMeta = {
  north: {
    x: 0,
    y: 1,
    right: 'east',
    left: 'west'
  },
  east: {
    x: 1,
    y: 0,
    right: 'south',
    left: 'north'
  },
  south: {
    x: 0,
    y: -1,
    right: 'west',
    left: 'east'
  },
  west: {
    x: -1,
    y: 0,
    right: 'north',
    left: 'south'
  }
}

module.exports = {
  getNewDirection(currentDirection, turning) {
    return directionMeta[currentDirection][turning]
  },
  getNewXY(x, y, direction) {
    return {
      x: x + directionMeta[direction].x,
      y: y + directionMeta[direction].y
    }
  },
  numberOfBlocksAway(path) {
    const steps = module.exports.parsePath(path)

    let currentDirection = 'north'
      , x = 0
      , y = 0

    steps.forEach(({turningDirection, blocks}) => {
      currentDirection = module.exports.getNewDirection(currentDirection, turningDirection)
      for (let i = 0; i < blocks; i++) {
        ({x, y} = module.exports.getNewXY(x, y, currentDirection))
      }
    })

    return Math.abs(x) + Math.abs(y)
  },
  numberOfBlocksAwayForLocationVisitedTwice(path) {
    const steps = module.exports.parsePath(path)

    const visitedNodes = new Set()

    let currentDirection = 'north'
      , x = 0
      , y = 0

    visitedNodes.add('x0y0')

    for (const {turningDirection, blocks} of steps) {
      currentDirection = module.exports.getNewDirection(currentDirection, turningDirection)
      for (let i = 0; i < blocks; i++) {
        ({x, y} = module.exports.getNewXY(x, y, currentDirection))
        const node = `x${x}y${y}`
        if (visitedNodes.has(node)) {
          return Math.abs(x) + Math.abs(y)
        }

        visitedNodes.add(node)
      }
    }
  },
  parsePath(path) {
    if (!path) {
      return []
    }

    return path.split(', ')
      .map(step => ({
        turningDirection: step[0] === 'L' ? 'left' : 'right',
        blocks: parseInt(step.slice(1, step.length), 10)
      }))
  }
}
