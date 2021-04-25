const union = function(otherSet) {
  const _union = new Set(this)

  for(const otherSetItem of otherSet) {
    _union.add(otherSetItem)
  }

  return _union
}

const difference = function (otherSet) {
  const _difference = new Set(this)

  for (const otherItem of otherSet) {
    _difference.delete(otherItem)
  }

  return _difference
}

const symmetricDifference = function(otherSet) { // disjunctive union
  const _symmetricDiff = new Set(this)

  for (const otherItem of otherSet) {
    if (_symmetricDiff.has(otherItem)) {
      _symmetricDiff.delete(otherItem)
    } else {
      _symmetricDiff.add(otherItem)
    }
  }

  return _symmetricDiff
}

const intersection = function (otherSet) {
  const _intersection =  new Set()

  for (const item of this) {
    if (otherSet.has(item)) {
      _intersection.add(item)
    }
  }

  return _intersection
}

const isSuperSet = function (otherSet) {
  for (const otherItem of otherSet) {
    if (!this.has(otherItem)) {
      return false
    }
  }

  return true
}

function bindExtensionMethods() {
  this.union = union
  this.difference = difference
  this.symmetricDifference = symmetricDifference
  this.disjunctiveUnion = symmetricDifference
  this.intersection = intersection
  this.isSuperSet = isSuperSet
}

function ExtendedSet(initialValue, BaseConstructor = Set) {
  const extendedSet = new BaseConstructor(initialValue)
  bindExtensionMethods.call(extendedSet)
  return extendedSet
}

module.exports = ExtendedSet
