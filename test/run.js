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

/**
 * A collection of tasks.
 */
const namespace = {
  /**
   * This will run if no task is provided.
   */
  default() {
    console.log('default task!')
  },

  subtask1() {
    console.log('This task does not have a description.')
  },

  /**
   * The second subtask.
   */
  subtask2() {},

  /**
   * If no default, will just list the tasks for that namespace.
   */
  deep: {
    subsubtask() {}
  }
}

require('../index')({
  some,
  somethingElse,
  anotherThing,
  namespace
})
