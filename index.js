'use strict'

require('./lib/colors')
const log = require('./lib/log')
const description = require('./lib/description')
/**
 * Pass in all public tasks, then runs the tasks whose names
 * were passed in as arguments on the command line.
 *
 * @param tasks {object}
 */
function run(tasks) {
  const args = process.argv.slice(2)
  const tasksToRun = args.filter(arg => arg.substring(0, 1) !== '-')
  const quietFlag = process.argv.find(arg => arg === '-q')
  const allTasks = Object.keys(tasks)
  const firstColumnWidth = allTasks.reduce(
    (a, b) => (a.length > b.length ? a : b)
  ).length
  const pad = length => ' '.repeat(firstColumnWidth - length)

  if (tasksToRun.length === 0) {
    log('Available tasks:'.underline)

    allTasks.forEach(task => {
      const taskDescription =
        tasks[task].description ||
        ((description().find(d => d.name === task) || {}).description || '')
          .trim()

      log(
        '  ' +
          task +
          (taskDescription
            ? pad(task.length) + ' - ' + taskDescription.grey
            : '')
      )
    })
  }

  tasksToRun.forEach(task => {
    const taskExists = allTasks.find(x => x === task)

    if (taskExists) {
      !quietFlag && log(task.green)
      tasks[task]()
    } else {
      !quietFlag && log(`'${task}' is not defined`.red)
    }
  })
}

module.exports = run
