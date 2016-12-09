module.exports = {
  decompress(str, version = 1) {
    let count = 0

    for (let i = 0; i < str.length;) {
      if (str[i] !== '(') {
        count++
        i++
      } else {
        const nextClosing = str.indexOf(')', i)
        const [numOfChars, times] = str.slice(i + 1, nextClosing).split('x')
          .map(n => parseInt(n, 10))

        const lettersToCopy = str.slice(nextClosing + 1, nextClosing + 1 + numOfChars)
        let innerCount = lettersToCopy.length
        if (version === 2) {
          innerCount = module.exports.decompress(lettersToCopy, 2)
        }

        count += innerCount * times

        i += nextClosing + 1 - i + numOfChars
      }
    }

    return count
  }
}
