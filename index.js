'use strict'

const path = require('path')
const colors = require('colors')

function log (text) {
  const filename = path.basename(process.argv[1])
  console.log(`[${filename}]`.grey, text)
}

function tasky (tasks) {
  const tasksToRun = process.argv.slice(2)
  const availableTasks = Object.keys(tasks)
  
  if (tasksToRun.length === 0) {
    console.log('Available tasks:'.grey)
    availableTasks.forEach((task) => {
      console.log('  ' + task.grey)
    })
    return
  }

  tasksToRun.forEach((task) => {
    const taskExists = availableTasks.find((x) => x === task) ? true : false
    if (taskExists) {
      log(task.green)
      tasks[task]()  
    } else {
      log(`'${task}' is not defined`.red)
    }
  })
}

module.exports = tasky
