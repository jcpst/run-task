'use strict'

const path = require('path')
const colors = require('./lib/colors')

function log (text) {
  const filename = path.basename(process.argv[1])
  console.log(colors.grey(`[${filename}]`), text)
}

function tasky (tasks) {
  const tasksToRun = process.argv.slice(2)
  const availableTasks = Object.keys(tasks)

  if (tasksToRun.length === 0) {
    console.log(colors.grey('Available tasks:'))
    availableTasks.forEach((task) => {
      console.log('  ' + colors.grey(task))
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

module.exports = tasky
