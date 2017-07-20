'use strict'

const assert = require('assert')
const exec = require('child_process').exec
const strip = require('strip-ansi')
const runTask = require('../index')
const log = require('../lib/log')

require('../lib/colors')

assert.equal(typeof runTask, 'function')

function runTest(description, command, expectedOutput) {
  exec(command, (err, stdout, stderr) => {
    log(description.green)

    if (err) {
      log(stderr)
      throw err
    }

    // Arrange
    const output = strip(stdout)

    // Act
    assert.equal(err, null)
    assert.equal(output, expectedOutput)
    assert.equal(stderr, '')
  })
}

runTest(
  'List available tasks when no task argument is provided.',
  'node test/run',
  `\
[run] Available tasks:
[run]   some          - a task that can be run
[run]   somethingElse - This is something else
[run]   anotherThing
`
)

runTest(
  'Run the task when provided the task argument.',
  'node test/run some',
  `\
[run] some
runs some task
`
)

runTest(
  'Friendly error message when running an undefined task.',
  'node test/run zzz',
  `\
[run] 'zzz' is not defined
`
)

runTest(
  'No console loggin by run-task when passed the -q flag.',
  'node test/run some -q',
  `\
runs some task
`
)

runTest(
  'Runs multiple tasks that are passed in as arguments.',
  'node test/run some somethingElse -q',
  `\
runs some task
runs another task
`
)
