'use strict'

function some() {
  console.log('runs some task')
}

some.description = 'a task that can be run'

/**
 * This is something else
 * @param hm
 */
function somethingElse() {
  console.log('runs another task')
}

function anotherThing() {
  console.log('This task does not have a description.')
}

require('../index')({
  some,
  somethingElse,
  anotherThing
})
