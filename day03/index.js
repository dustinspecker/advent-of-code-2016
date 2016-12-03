const {EOL} = require('os')

module.exports = {
  numberOfValidTriangles(dimensions, dimensionsParser) {
    return dimensionsParser(dimensions)
      .filter(module.exports.triangleIsValid)
      .length
  },
  parseDimensionsByRow(dimensions) {
    return dimensions.split(EOL)
      .map(dimension =>
        dimension.split(/\s+/)
          .filter(str => str)
          .map(str => parseInt(str, 10))
      )
  },
  triangleIsValid(sides) {
    const [a, b, c] = sides.sort((n1, n2) => n1 > n2)

    return a + b > c
  }
}
