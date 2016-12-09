module.exports = {
  decompress(str) {
    let decompressed = ''

    for (let i = 0; i < str.length;) {
      if (str[i] !== '(') {
        decompressed += str[i]
        i++
      } else {
        const nextClosing = str.indexOf(')', i)
        const [numOfChars, times] = str.slice(i + 1, nextClosing).split('x')
          .map(n => parseInt(n, 10))

        let lettersToCopy = ''
        for (let j = 0; j < numOfChars; j++) {
          lettersToCopy += str[nextClosing + 1 + j]
        }

        decompressed += lettersToCopy.repeat(times)

        i += nextClosing + 1 - i + numOfChars
      }
    }

    return decompressed
  }
}
