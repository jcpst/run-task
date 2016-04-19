'use strict'

const path = require('path')
const colors = require('./colors')

function log (text) {
  const filename = path.basename(process.argv[1])
  console.log(colors.grey(`[${filename}]`), text)
}

module.exports = log

