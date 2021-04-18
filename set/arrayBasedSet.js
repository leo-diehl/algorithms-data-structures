function ArrayBasedSet(initialValue) {
  const baseArr = new Array(...initialValue)

  baseArr.entries = function() {
    const entries = []
    for (const value of this) {
      entries.push([value, value])
    }
    return entries
  }

  baseArr.has = function(value) {
    return this.some((item) => item === value)
  }

  baseArr.add = function(value) {
    if (!this.has(value)) {
      this.push(value)
    }
  }

  baseArr.delete = function(value) {
    const itemIndex = this.findIndex((item) => item === value)
    if (itemIndex === -1) {
      return
    }

    this.splice(itemIndex, 1)
  }

  baseArr.clear = function() {
    this.splice(0)
  }

  baseArr.keys = baseArr.values

  Object.defineProperty(baseArr, 'size', {
    enumerable: true,
    get: function() {
      return this.length
    }
  })

  return baseArr
}

module.exports = ArrayBasedSet