'use strict'

const util = require('util')
const colors = util.inspect.colors

/**
 * Wraps a string in ANSI SGR escape sequences,
 * based on what's available in `utils.inspect`.
 *
 * @param {string} color - Expects a property from `util.inspect.colors`.
 * @param {string} text
 * @returns {string}
 */
function ANSIWrap(color, text) {
  const codes = colors[color]
  return `\x1b[${codes[0]}m${text}\x1b[${codes[1]}m`
}

/**
 * Extends String.prototype with the following props for styling stdout:
 *   white, grey, black, blue, cyan, green, magenta,
 *   red, yellow, bold, italic, underline, inverse
 */
Object.keys(colors).forEach(color => {
  String.prototype.__defineGetter__(color, function() {
    return ANSIWrap(color, this)
  })
})
