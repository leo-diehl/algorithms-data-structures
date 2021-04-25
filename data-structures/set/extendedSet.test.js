const ExtendedSet = require('./extendedSet')

const { run } = require('../../testHelper')
const getInternalTests = require('./internalTestHelper')
const getExtendedTests = require('./extendedTestHelper')

run({
  internal: getInternalTests(ExtendedSet),
  extended: getExtendedTests(Set),
})
