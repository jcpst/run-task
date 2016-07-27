'use strict'

const assert = require('assert')
const exec = require('child_process').exec
const strip = require('strip-ansi')
const runTask = require('../index')

assert.equal(typeof runTask, 'function')

exec('node test/run', function (err, stdout, stderr) {
  if (err) throw err

  // Arrange
  const output = strip(stdout)
  const expectedResult = `\
[run] Usage: node index
[run] Available tasks:
[run]   some - a task that can be run
[run]   somethingElse - undefined
`

  // Act
  assert.equal(err, null)
  assert.equal(output, expectedResult)
  assert.equal(stderr, '')
})

exec('node test/run some', function (err, stdout, stderr) {
  if (err) throw err

  // Arrange
  const output = strip(stdout)
  const expectedResult = `\
[run] some
runs some task
`

  // Act
  assert.equal(err, null)
  assert.equal(output, expectedResult)
  assert.equal(stderr, '')
})

exec('node test/run zzz', function (err, stdout, stderr) {
  if (err) throw err

  // Arrange
  const output = strip(stdout)
  const expectedResult = `\
[run] 'zzz' is not defined
`

  // Act
  assert.equal(err, null)
  assert.equal(output, expectedResult)
  assert.equal(stderr, '')
})

