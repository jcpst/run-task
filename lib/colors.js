'use strict'

const util = require('util')

/**
 * Wraps a string in ANSI SGR escape sequences,
 * based on what's available in `utils.inspect`.
 *
 * @param {string} color - Expects an element from the `Object.keys(util.inspect.colors)` array.
 * @param {string} text
 * @returns {string}
 */
function colorize (color, text) {
  const codes = util.inspect.colors[color]
  return `\x1b[${codes[0]}m${text}\x1b[${codes[1]}m`
}

/**
 * Returns an object with the following methods for stying stdout:
 *   white, grey, black, blue, cyan, green, magenta,
 *   red, yellow, bold, italic, underline, inverse
 *
 * @returns {{}}
 */
function colors () {
  let returnValue = {}
  Object.keys(util.inspect.colors).forEach(color => {
    returnValue[color] = text => colorize(color, text)
  })
  return returnValue
}

module.exports = colors()

