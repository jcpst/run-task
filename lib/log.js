'use strict'

require('./colors')
const path = require('path')

/**
 * Prepends a string with the name of the task file
 * and sends it to stdout.
 *
 * @param text {string}
 */
function log (text) {
  const filename = path.basename(process.argv[1])
  console.log(`[${filename}]`.grey, text)
}

module.exports = log

