const { assert, assertError } = require('../../testHelper')

// Set
const mySet = new Set([1, 2, 3, 4])
assert(mySet.has(1))
assert(mySet.has(5) === false)
mySet.add(5)
assert(mySet.has(5))
const myObj = { a: 1 }
mySet.add(myObj)
assert(mySet.has(myObj))
mySet.delete(myObj)
assert(mySet.has(myObj) === false)
mySet.clear()
assert(mySet.size === 0)

// Map
const zaz = {}
const blurp = function() {}
const mapEntries = [[1, 'a'], [zaz, 'b'], [blurp, 'c']]
const myMap = new Map(mapEntries)
assert(myMap.get(1) === 'a')
assert(myMap.has(zaz))
assert(myMap.get(blurp) === 'c')
assert(myMap.size === 3)
assert(myMap.delete(blurp))
assert(!myMap.has(blurp))
assert(myMap.size === 2)

const iteratedMap = []
for(const mapEntry of myMap) {
  iteratedMap.push(mapEntry)
}
assert(JSON.stringify(iteratedMap) === '[[1,"a"],[{},"b"]]')

const a = {}
const b = {}
const c = {}
const d = {}

// WeakSet
const myWeakSet = new WeakSet([a, b, c])
assert(myWeakSet.has(a))
assert(myWeakSet.has(b))
assert(myWeakSet.has(d) === false)

assertError(() => {
  for(const weakItem of myWeakSet) {
    console.log(weakItem)
  }
})
assertError(() => {
  const nonObjectValue = 'blew'
  myWeakSet.add(nonObjectValue)
})


// WeakMap
const weakMapEntries = [[a, 1], [b, 2], [c, 3]]
const myWeakMap = new WeakMap(weakMapEntries)
assert(myWeakMap.get(a) === 1)
assert(myWeakMap.get(c) === 3)
assert(myWeakMap.has(b))
assert(!myWeakMap.has(d))
assert(myWeakMap.get(d) === undefined)

assertError(() => {
  for(const weakEntry of myWeakMap) {
    console.log(weakEntry)
  }
})
assertError(() => {
  const nonObjectValue = 'blew'
  myWeakMap.set(nonObjectValue, 'something')
})
