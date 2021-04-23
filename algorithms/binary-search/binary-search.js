const assert = require('assert')
const fs = require('fs')

const primeNumbers = fs.readFileSync('./prime-numbers').toString()
  .split(',').map(number => parseInt(number))

const tenMillionNumbers = []
for (let i = 1; i <= 10000000; i ++) {
  tenMillionNumbers.push(i)
}

const test = []
for (let i = 1; i <= 128; i ++) {
  test.push(i)
}

const testTwo = []
for (let i = 1; i <= 256; i ++) {
  testTwo.push(i)
}

const binarySearch = (targetValue, data) => {
  let min = 0
  let max = data.length - 1
  let guess
  let count = 1

  while(min <= max) {
    // console.log(`[${count}] => ${max - min}`); // [XXX] REMOVE BEFORE COMMITING
    // console.log(`min: ${min}`); // [XXX] REMOVE BEFORE COMMITING
    // console.log(`max: ${max}`); // [XXX] REMOVE BEFORE COMMITING
    guess = Math.floor((min + max) / 2)
    const stringIllus = data.map((pos, idx) => {
      if (idx === guess) {
        return '+'
      }

      return (idx >= min && idx <= max) ? '_' : 'X'
    })
    console.log(stringIllus.join('')); // [XXX] REMOVE BEFORE COMMITING
    // console.log(`guess: ${guess}`); // [XXX] REMOVE BEFORE COMMITING
    // console.log(`guess: ${guess}\n`); // [XXX] REMOVE BEFORE COMMITING
    // console.log(`data[guess]: ${data[guess]}\n`); // [XXX] REMOVE BEFORE COMMITING

    count++
    if (data[guess] === targetValue) {
      return guess
    }

    if (data[guess] > targetValue) {
      max = guess - 1
    } else {
      min = guess + 1
    }
  }

  return -1
}

binarySearch(256, testTwo)
// binarySearch(testTwo.length, testTwo)

// assert(binarySearch(2, primeNumbers) === 0)
// assert(binarySearch(223, primeNumbers) === 47)
// assert(binarySearch(547, primeNumbers) === 100)
// assert(binarySearch(997, primeNumbers) === 167)

// // Perfomance testing
// console.time('9999999 - binary')
// binarySearch(9999999, tenMillionNumbers)
// console.timeEnd('9999999 - binary')

// console.time('9999999 - linear')
// tenMillionNumbers.findIndex(number => number === 9999999)
// console.timeEnd('9999999 - linear')


