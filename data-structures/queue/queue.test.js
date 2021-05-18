const { assert } = require('../../testHelper')

const { Queue, ObjectQueue } = require('./queue')

function testQueueConstructor(QueueConstructor) {
  console.log(`Testing ${QueueConstructor.name}`)

  const queue = new QueueConstructor(5)

  assert(queue.isEmpty())
  assert(!queue.isFull())

  queue.enqueue(1)
  assert(!queue.isEmpty())
  assert(queue.dequeue() === 1)
  assert(queue.isEmpty())

  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  assert(!queue.isEmpty())
  assert(!queue.isFull())
  assert(queue.dequeue() === 1)
  assert(queue.dequeue() === 2)
  assert(queue.dequeue() === 3)
  assert(queue.isEmpty())

  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  queue.enqueue(4)
  queue.enqueue(5)
  assert(!queue.isEmpty())
  assert(queue.isFull())
  assert(queue.dequeue() === 1)
  assert(!queue.isFull())
  queue.enqueue(6)
  assert(queue.dequeue() === 2)
  assert(queue.dequeue() === 3)
  assert(queue.dequeue() === 4)
  assert(queue.dequeue() === 5)
  assert(queue.dequeue() === 6)
  assert(queue.isEmpty())
}

testQueueConstructor(Queue)
testQueueConstructor(ObjectQueue)
