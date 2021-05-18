module.exports.LinkedListNode = function Node(data) {
  this.data = data

  let next = null
  Object.defineProperty(this, 'next', {
    get: () => next,
    set: (value) => {
      if (!(value instanceof Node)) {
        throw new Error('"next" must be a Node')
      }
      next = value
    }
  })
}

module.exports.LinkedList = function (HEAD) {
  this.HEAD = HEAD

  Object.defineProperty(this, 'TAIL', {
    get: () => {
      let current = HEAD
      while (current) {
        if (!current.next) {
          return current
        }
        current = current.next
      }
    }
  })

  this.clear = function () {
    this.HEAD = null
  }

  this[Symbol.iterator] = function* () {
    let iteratee = this.HEAD
    while (iteratee) {
      yield iteratee.data
      iteratee = iteratee.next
    }
  }
}
