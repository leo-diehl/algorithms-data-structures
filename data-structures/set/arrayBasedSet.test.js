const ArrayBasedSet = require('./arrayBasedSet')

const { run } = require('../../testHelper')
const getInternalTests = require('./internalTestHelper')
const getExtendedTests = require('./extendedTestHelper')

run({
  internal: getInternalTests(ArrayBasedSet),
  extended: getExtendedTests(ArrayBasedSet),
})
