'use strict'

const colors = require('./lib/colors')
const log = require('./lib/log')

function run (tasks) {
  const tasksToRun = process.argv.slice(2)
  const availableTasks = Object.keys(tasks)

  if (tasksToRun.length === 0) {
    log(colors.underline('Available tasks:'))
    availableTasks.forEach((task) => {
      log('  ' + task)
    })
    return
  }

  tasksToRun.forEach((task) => {
    const taskExists = availableTasks.find((x) => x === task)
    if (taskExists) {
      log(colors.green(task))
      tasks[task]()
    } else {
      log(colors.red(`'${task}' is not defined`))
    }
  })
}

module.exports = run

