function entries() {
  const entries = []
  for (const value of this) {
    entries.push([value, value])
  }
  return entries
}

function has(value) {
  return this.some((item) => item === value)
}

function add(value) {
  if (!this.has(value)) {
    this.push(value)
  }
}

function customDelete(value) {
  const itemIndex = this.findIndex((item) => item === value)
  if (itemIndex === -1) {
    return
  }

  this.splice(itemIndex, 1)
}

function clear() {
  this.splice(0)
}

const sizeDefinition = {
  enumerable: true,
  get: function() {
    return this.length
  },
}

function ArrayBasedSet(initialValue) {
  const baseArr = new Array(...initialValue)

  baseArr.entries = entries
  baseArr.has = has
  baseArr.add = add
  baseArr.delete = customDelete
  baseArr.clear = clear
  baseArr.keys = baseArr.values

  Object.defineProperty(baseArr, 'size', sizeDefinition)

  return baseArr
}

module.exports = ArrayBasedSet
