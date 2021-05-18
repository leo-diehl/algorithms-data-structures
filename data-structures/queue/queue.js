module.exports.ObjectQueue = function ObjectQueue(maxSize) {
  const items = {}
  let front = -1
  let rear = -1

  this.enqueue = (item) => {
    rear += 1
    if (front === -1) {
      front = 0
    }
    items[rear] = item
  }
  this.dequeue = () => {
    const nextItem = items[front]
    delete items[front]

    front += 1
    if (front > rear) {
      front = rear = -1
    }

    return nextItem
  }
  this.isEmpty = () => front === -1 && rear === -1
  this.isFull = () => Object.keys(items).length === maxSize
  this.peek = () => front !== -1 ? items[front] : undefined
}

module.exports.Queue = function Queue(maxSize) {
  const items = []
  this.enqueue = (item) => items.push(item)
  this.dequeue = () => items.length && items.shift()
  this.isEmpty = () => !items.length
  this.isFull = () => items.length === maxSize
  this.peek = () => items[0]
}
