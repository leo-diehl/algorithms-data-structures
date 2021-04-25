const MapBasedSet = require('./mapBasedSet')

const { run } = require('../../testHelper')
const getInternalTests = require('./internalTestHelper')
const getExtendedTests = require('./extendedTestHelper')

run({
  internal: getInternalTests(MapBasedSet),
  extended: getExtendedTests(MapBasedSet),
})
