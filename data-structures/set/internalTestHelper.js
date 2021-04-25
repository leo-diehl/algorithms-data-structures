const { assert } = require('../../testHelper')

const basis = [1, 2, 3, 4, 5, 6, 7]
const getInstances = (CustomSet) => {
  return {
    baseInst: new Set(basis),
    customInst: new CustomSet(basis),
  }
}

const assertSameEntries = (instA, instB) => {
  const stringifiedA = JSON.stringify(Array.from(instA.entries()))
  const stringifiedB = JSON.stringify(Array.from(instB.entries()))
  assert(
    stringifiedA === stringifiedB,
    `${stringifiedA} !== ${stringifiedB}`
  )
}

const testEntries = (CustomSet) => {
  const { baseInst, customInst } = getInstances(CustomSet)
  assertSameEntries(baseInst, customInst)
}

const testKeys = (CustomSet) => {
  const { baseInst, customInst } = getInstances(CustomSet)

  const stringifiedBase = JSON.stringify(Array.from(baseInst.keys()))
  const stringifiedCustom = JSON.stringify(Array.from(customInst.keys()))
  assert(
    stringifiedBase === stringifiedCustom,
    `${stringifiedBase} !== ${stringifiedCustom}`
  )
}

const testValues = (CustomSet) => {
  const { baseInst, customInst } = getInstances(CustomSet)

  const stringifiedBase = JSON.stringify(Array.from(baseInst.values()))
  const stringifiedCustom = JSON.stringify(Array.from(customInst.values()))
  assert(
    stringifiedBase === stringifiedCustom,
    `${stringifiedBase} !== ${stringifiedCustom}`
  )
}

const testHas = (CustomSet) => {
  const { baseInst, customInst } = getInstances(CustomSet)

  const tests = [1, 4, 10, 2, 3, 8]
  const stringifiedBase = tests.map((item) => baseInst.has(item)).join(',')
  const stringifiedCustom = tests.map((item) => customInst.has(item)).join(',')

  assert(
    stringifiedBase === stringifiedCustom,
    `${stringifiedBase} !== ${stringifiedCustom}`
  )
}

const testAdd = (CustomSet) => {
  const { baseInst, customInst } = getInstances(CustomSet)

  const firstItem = basis[3]
  baseInst.add(firstItem)
  customInst.add(firstItem)
  assertSameEntries(baseInst, customInst)

  const secondItem = basis[1]
  baseInst.add(secondItem)
  customInst.add(secondItem)
  assertSameEntries(baseInst, customInst)

  baseInst.add(firstItem)
  customInst.add(firstItem)
  assertSameEntries(baseInst, customInst)
}

const testDelete = (CustomSet) => {
  const { baseInst, customInst } = getInstances(CustomSet)

  const firstItem = basis[3]
  baseInst.delete(firstItem)
  customInst.delete(firstItem)
  assertSameEntries(baseInst, customInst)

  const secondItem = basis[1]
  baseInst.delete(secondItem)
  customInst.delete(secondItem)
  assertSameEntries(baseInst, customInst)

  baseInst.delete(firstItem)
  customInst.delete(firstItem)
  assertSameEntries(baseInst, customInst)
}

const testSize = (CustomSet) => {
  const { baseInst, customInst } = getInstances(CustomSet)

  assert(
    baseInst.size === customInst.size,
    `expected: ${baseInst.size} received: ${customInst.size}`
  )

  const firstItem = basis[3]
  baseInst.delete(firstItem)
  customInst.delete(firstItem)

  assert(
    baseInst.size === customInst.size,
    `expected: ${baseInst.size} received: ${customInst.size}`
  )
}

const testClear = (CustomSet) => {
  const { customInst } = getInstances(CustomSet)

  customInst.clear()
  assertSameEntries(customInst, new Set())
}

module.exports = function getTests(CustomSet) {
  return {
    testEntries: () => testEntries(CustomSet),
    testKeys: () => testKeys(CustomSet),
    testValues: () => testValues(CustomSet),
    testHas: () => testHas(CustomSet),
    testAdd: () => testAdd(CustomSet),
    testDelete: () => testDelete(CustomSet),
    testClear: () => testClear(CustomSet),
    testSize: () => testSize(CustomSet),
  }
}
