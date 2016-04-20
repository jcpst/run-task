'use strict'

const assert = require('assert')
const exec = require('child_process').exec
const runTask = require('../index')

assert.equal(typeof runTask, 'function')

exec('node test/run', function (err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal(stdout, `\
\u001b[90m[run]\u001b[39m \u001b[4mAvailable tasks:\u001b[24m
\u001b[90m[run]\u001b[39m something\n`)
  assert.equal(stderr, '')
})

exec('node test/run something', function (err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal(stdout, `\
\u001b[90m[run]\u001b[39m \u001b[32msomething\u001b[39m
runs some task\n`)
  assert.equal(stderr, '')
})

exec('node test/run zzz', function (err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal(stdout, `\
\u001b[90m[run]\u001b[39m \u001b[31m\'zzz\' is not defined\u001b[39m\n`)
  assert.equal(stderr, '')
})

