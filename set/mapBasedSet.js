function setAdd(newItem) {
  if (!this.has(newItem)) {
    this.set(newItem, newItem)
  }
}

function MapBasedSet(initialValue = []) {
  const baseMap = new Map()

  for (const initialItem of initialValue) {
    baseMap.set(initialItem, initialItem)
  }

  baseMap.add = setAdd
  baseMap[Symbol.iterator] = baseMap.values

  return baseMap
}

module.exports = MapBasedSet
