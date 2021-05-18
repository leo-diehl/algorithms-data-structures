const Stack = function (maxLength = null) {
  const entries = []

  this.push = (item) => {
    if (entries.length === maxLength) {
      return
    }
    entries.push(item)
  }
  this.pop = () => entries.length && entries.pop()
  this.peek = () => entries[entries.length - 1]
  this.isEmpty = () => !entries.length
  this.isFull = () => entries.length === maxLength
}

module.exports = Stack
