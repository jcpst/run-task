'use strict'

const assert = require('assert')
const exec = require('child_process').exec
const strip = require('strip-ansi')
const runTask = require('../index')

assert.equal(typeof runTask, 'function')

function runTest (command, expectedOutput) {
  exec(command, (err, stdout, stderr) => {
    if (err) throw err

    // Arrange
    const output = strip(stdout)

    // Act
    assert.equal(err, null)
    assert.equal(output, expectedOutput)
    assert.equal(stderr, '')
  })
}

runTest('node test/run', `\
[run] Available tasks:
[run]   some - a task that can be run
[run]   somethingElse - This is something else
`)

runTest('node test/run some', `\
[run] some
runs some task
`)

runTest('node test/run zzz', `\
[run] 'zzz' is not defined
`)

runTest('node test/run some -q', `\
runs some task
`)

runTest('node test/run some somethingElse -q', `\
runs some task
runs another task
`)
