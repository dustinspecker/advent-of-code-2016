module.exports = class {
  constructor(key, {up = null, right = null, down = null, left = null} = {}) {
    this.key = key

    this.up = up
    this.right = right
    this.down = down
    this.left = left
  }

  move(direction) {
    return this[direction] || this
  }
}
