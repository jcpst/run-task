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

  function formatTask(tasks, task, depth) {
    const taskDescription =
      tasks[task].description ||
      ((description().find(d => d.name === task) || {}).description || '')
        .trim()
    const taskDescriptionFormat = taskDescription
      ? pad(task.length) + ' - ' + taskDescription.grey
      : ''

    log('  '.repeat(depth || 1) + task + taskDescriptionFormat)
  }

  if (tasksToRun.length === 0) {
    log('Available tasks:'.underline)

    allTasks.forEach(taskKey => {
      const task = tasks[taskKey]
      if (typeof task === 'function') {
        formatTask(tasks, taskKey)
      } else if (
        !Array.isArray(task) &&
        task !== null &&
        typeof task === 'object'
      ) {
        // TODO: Be able to print the descriptions for sub-tasks.
        // TODO: Be able to run sub-tasks like: `node run build:dev`.
        // TODO: Run a default task if it is defined.
        // TODO: Create arbitrarily deep sub tasks.
        formatTask(tasks, taskKey)
        Object.keys(task).forEach(t => {
          formatTask(task, t, 2)
        })
      }
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
