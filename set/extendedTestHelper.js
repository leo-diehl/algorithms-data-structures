const ExtendedSet = require('./extendedSet')
const { assert } = require('../testHelper')

const testSuites = {
  union: [
    {
      sets: [
        [1, 2, 3],
        [4, 5, 6]
      ],
      expectedResult: [1, 2, 3, 4, 5, 6],
    },
    {
      sets: [
        [1, 2],
        [2, 3]
      ],
      expectedResult: [1, 2, 3],
    },
    {
      sets: [
        [3, 2, 10],
        [1, 2, 3, 7]
      ],
      expectedResult: [3, 2, 10, 1, 7],
    },
    {
      sets: [
        [],
        []
      ],
      expectedResult: [],
    }
  ],
  intersection: [
    {
      sets: [
        [1, 2, 3],
        [4, 5, 6]
      ],
      expectedResult: [],
    },
    {
      sets: [
        [1, 2],
        [2, 3]
      ],
      expectedResult: [2],
    },
    {
      sets: [
        [3, 2, 10],
        [1, 2, 3, 7]
      ],
      expectedResult: [3, 2],
    }
  ],
  difference: [
    {
      sets: [
        [1, 2, 3],
        [4, 5, 6]
      ],
      expectedResult: [1, 2, 3],
    },
    {
      sets: [
        [1, 2],
        [2, 3]
      ],
      expectedResult: [1],
    },
    {
      sets: [
        [3, 6, 2, 10],
        [1, 2, 3, 7]
      ],
      expectedResult: [6, 10],
    }
  ],
  symmetricDifference: [
    {
      sets: [
        [1, 2, 3],
        [4, 5, 6]
      ],
      expectedResult: [1, 2, 3, 4, 5, 6],
    },
    {
      sets: [
        [1, 2],
        [2, 3]
      ],
      expectedResult: [1, 3],
    },
    {
      sets: [
        [3, 6, 2, 10],
        [1, 2, 3, 7]
      ],
      expectedResult: [6, 10, 1, 7],
    },
    {
      sets: [
        [1, 2, 3],
        [1, 2, 3]
      ],
      expectedResult: [],
    }
  ],
  isSuperSet: [
    {
      sets: [
        [1, 2, 3],
        [4, 5, 6]
      ],
      expectedResult: false,
    },
    {
      sets: [
        [1, 2, 3],
        [2, 3]
      ],
      expectedResult: true,
    },
    {
      sets: [
        [1, 6, 7, 2, 10],
        [1, 2, 7]
      ],
      expectedResult: true,
    }
  ]
}

const testUnion = (getSetFromArray) => {
  for (const test of testSuites.union) {
    const result = getSetFromArray(test.sets[0]).union(getSetFromArray(test.sets[1]))
    assert(
      JSON.stringify(Array.from(result)) === JSON.stringify(test.expectedResult),
      JSON.stringify(`${Array.from(result)} !== ${test.expectedResult}`)
    )
  }
}

const testIntersection = (getSetFromArray) => {
  for (const test of testSuites.intersection) {
    const result = getSetFromArray(test.sets[0]).intersection(getSetFromArray(test.sets[1]))
    assert(
      JSON.stringify(Array.from(result)) === JSON.stringify(test.expectedResult),
      JSON.stringify(`${Array.from(result)} !== ${test.expectedResult}`)
    )
  }
}

const testDifference = (getSetFromArray) => {
  for (const test of testSuites.difference) {
    const result = getSetFromArray(test.sets[0]).difference(getSetFromArray(test.sets[1]))
    assert(
      JSON.stringify(Array.from(result)) === JSON.stringify(test.expectedResult),
      JSON.stringify(`${Array.from(result)} !== ${test.expectedResult}`)
    )
  }
}

const testSymmetricDifference = (getSetFromArray) => {
  for (const test of testSuites.symmetricDifference) {
    const result = getSetFromArray(test.sets[0]).symmetricDifference(getSetFromArray(test.sets[1]))
    assert(
      JSON.stringify(Array.from(result)) === JSON.stringify(test.expectedResult),
      JSON.stringify(`${Array.from(result)} !== ${test.expectedResult}`)
    )
  }
}

const testIsSuperSet = (getSetFromArray) => {
  for (const test of testSuites.isSuperSet) {
    const result = getSetFromArray(test.sets[0]).isSuperSet(getSetFromArray(test.sets[1]))
    assert(
      result === test.expectedResult,
      JSON.stringify(`${test.sets[1]} not superset of ${test.sets[0]}`)
    )
  }
}

module.exports = function getTests(baseSet) {
  const getExtendedSetFromArray = (arr) => {
    return new ExtendedSet(arr, baseSet)
  }

  return {
    testUnion: () => testUnion(getExtendedSetFromArray),
    testIntersection: () => testIntersection(getExtendedSetFromArray),
    testDifference: () => testDifference(getExtendedSetFromArray),
    testSymmetricDifference: () => testSymmetricDifference(getExtendedSetFromArray),
    testIsSuperSet: () => testIsSuperSet(getExtendedSetFromArray),
  }
}
