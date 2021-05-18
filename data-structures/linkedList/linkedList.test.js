const { LinkedListNode, LinkedList } = require('./linkedList')
const { assert, assertError } = require('../../testHelper')

const firstNode = new LinkedListNode(1)
const myList = new LinkedList(firstNode)
assert(myList.HEAD.data === 1)
assertError(() => firstNode.next = 3)

const secondNode = new LinkedListNode(2)
firstNode.next = secondNode
assert(myList.TAIL.data === 2)

const thirdNode = new LinkedListNode(3)
secondNode.next = thirdNode
assert(myList.TAIL.data === 3)

const fourthNode = new LinkedListNode(4)
thirdNode.next = fourthNode
assert(myList.TAIL.data === 4)

assert(myList.HEAD.data === 1)
assert(Array.from(myList).join(',') === '1,2,3,4')

const fifthNode = new LinkedListNode(5)
thirdNode.next = fifthNode
assert(Array.from(myList).join(',') === '1,2,3,5')

fifthNode.next = fourthNode
assert(Array.from(myList).join(',') === '1,2,3,5,4')

myList.HEAD = secondNode
assert(Array.from(myList).join(',') === '2,3,5,4')
