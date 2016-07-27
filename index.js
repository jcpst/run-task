'use strict'

const path = require('path')
const colors = require('./lib/colors')
const log = require('./lib/log')

/**
 * Pass in all public tasks, then runs the tasks whose names
 * were passed in as arguments on the command line.
 *
 * @param tasks {object}
 */
function run (tasks) {
  const filename = path.basename(__filename, '.js')
  const tasksToRun = process.argv.slice(2)
  const allTasks = Object.keys(tasks)

  if (tasksToRun.length === 0) {
    log(colors.green(`Usage: node ${filename}`))
    log(colors.underline('Available tasks:'))
    allTasks.forEach(task => {
      const description = tasks[task].description
        ? ' - ' + colors.grey(tasks[task].description)
        : ''
      log('  ' + task + description)
    })
  }

  tasksToRun.forEach((task) => {
    let taskExists = allTasks.find(x => x === task)
    if (taskExists) {
      log(colors.green(task))
      tasks[task]()
    } else {
      log(colors.red(`'${task}' is not defined`))
    }
  })
}

module.exports = run
