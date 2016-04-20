'use strict'

const path = require('path')
const colors = require('./colors')

/**
 * Prepends a string with the name of the task file
 * and sends it to stdout.
 * 
 * @param text {string}
 */
function log (text) {
  const filename = path.basename(process.argv[1])
  console.log(colors.grey(`[${filename}]`), text)
}

module.exports = log

