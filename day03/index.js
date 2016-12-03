const {EOL} = require('os')

module.exports = {
  numberOfValidTriangles(dimensions, dimensionsParser) {
    return dimensionsParser(dimensions)
      .filter(module.exports.triangleIsValid)
      .length
  },
  parseDimensionsByColumn(dimensions) {
    const rows = module.exports.parseDimensionsByRow(dimensions)

    const triangles = []

    for (let i = 0; i < rows.length - 2; i += 3) {
      triangles.push([rows[i][0], rows[i + 1][0], rows[i + 2][0]])
      triangles.push([rows[i][1], rows[i + 1][1], rows[i + 2][1]])
      triangles.push([rows[i][2], rows[i + 1][2], rows[i + 2][2]])
    }

    return triangles
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
