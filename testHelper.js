module.exports.assert = (testResult, description) => {
  if (!testResult) {
    throw new Error(description)
  }
}

module.exports.assertError = (assertion, description) => {
  try {
    assertion()
  } catch (e) {
    return true
  }

  throw new Error(description)
}

// {
//   internal: {
//     bla: () => {},
//   },
//   foo: () => {},
//   extended: {
//     zaz: {
//       () => {},
//     },
//     blurp: () => {},
//   }
// }

const run = (tests, depth = 1) => {
  for (const [testName, test] of Object.entries(tests)) {
    const tabs = new Array(depth).join('    ')
    console.log(`${tabs}> ${testName}`)

    if (typeof test === 'function') {
      test()
    } else if (typeof test === 'object' && test !== null) {
      run(test, depth + 1)
    } else {
      throw new Error('Invalid test suite format')
    }
  }
}

module.exports.run = run