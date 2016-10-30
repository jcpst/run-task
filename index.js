'use strict'

const colors = require('./lib/colors')
const log = require('./lib/log')
const description = require('./lib/description')
/**
 * Pass in all public tasks, then runs the tasks whose names
 * were passed in as arguments on the command line.
 *
 * @param tasks {object}
 */
function run (tasks) {
  const args = process.argv.slice(2)
  const tasksToRun = args.filter(arg => arg.substring(0, 1) !== '-')
  const allTasks = Object.keys(tasks)
  const quietFlag = process.argv.find(arg => arg === '-q')

  if (tasksToRun.length === 0) {
    log(colors.underline('Available tasks:'))
    allTasks.forEach(task => {
      const taskDescription = tasks[task].description
        ? ' - ' + tasks[task].description
        : ' -' + description().find(d => d.name === task).description
      log('  ' + task + colors.grey(taskDescription))
    })
  }

  tasksToRun.forEach(task => {
    const taskExists = allTasks.find(x => x === task)
    if (taskExists) {
      !quietFlag && log(colors.green(task))
      tasks[task]()
    } else {
      !quietFlag && log(colors.red(`'${task}' is not defined`))
    }
  })
}

module.exports = run
