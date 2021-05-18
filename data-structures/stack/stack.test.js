const { assert } = require('../../testHelper')

const Stack = require('./stack')

const sizeLimit = 5
const myStack = new Stack(sizeLimit)

assert(myStack.isEmpty())
assert(!myStack.isFull())
assert(myStack.peek() === undefined)

myStack.push(3)
assert(myStack.peek() === 3)
assert(myStack.pop() === 3)
assert(myStack.isEmpty())

myStack.push(1)
myStack.push(2)
myStack.push(3)
assert(!myStack.isEmpty())
assert(myStack.peek() === 3)
assert(myStack.pop() === 3)
assert(myStack.peek() === 2)
assert(myStack.pop() === 2)
assert(myStack.peek() === 1)
assert(myStack.pop() === 1)
assert(myStack.isEmpty())

myStack.push(1)
myStack.push(2)
myStack.push(3)
myStack.push(4)
myStack.push(5)
assert(!myStack.isEmpty())
assert(myStack.isFull())
assert(myStack.peek() === 5)
myStack.push(6)
assert(myStack.peek() === 5)
assert(myStack.peek() === 5)
assert(myStack.pop() === 5)
assert(!myStack.isFull())
myStack.push(6)
assert(myStack.peek() === 6)
assert(myStack.pop() === 6)
assert(myStack.pop() === 4)
assert(myStack.pop() === 3)
assert(myStack.pop() === 2)
assert(myStack.pop() === 1)
assert(myStack.isEmpty())