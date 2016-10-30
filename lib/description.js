'use strict'

const fs = require('fs')
const path = require('path')
const acorn = require('acorn')

let comments = []

function fileContents () {
  const filename = process.argv[1].replace(/\.[^/.]+$/, '')
  const filepath = path.normalize(filename)
  const extension = path.extname(filepath) || '.js'
  return fs.readFileSync(filepath + extension, { encoding: 'utf-8' })
}

function parseScript (script) {
  return acorn.parse(script, {
    locations: true,
    onComment: comments
  })
}

function getFunctions (ast) {
  let functions = []
  ast.body.forEach(item => {
    if (item.type === 'FunctionDeclaration') {
      functions.push(item)
    }
  })
  return functions
}

function getDescription (commentLines) {
  let description = ''
  commentLines.forEach(commentLine => {
    if (/\*\s+/g.test(commentLine) && !/\*\s+@/.test(commentLine)) {
      description += commentLine.replace(/\*\s+/g, '')
    }
  })
  return description
}

function getJSDocComments (functions) {
  let returnValue = []

  comments.forEach(comment => {
    const commentLines = comment.value.split(/\n|\r\n|\r/g)
    const isJSDoc = /\*\s*/.test(commentLines[0])

    if (comment.type === 'Block' && isJSDoc) {
      const description = getDescription(commentLines)
      functions.forEach(func => {
        if (func.loc.start.line === comment.loc.end.line + 1) {
          returnValue.push({
            description: description,
            name: func.id.name
          })
        }
      })
    }
  })

  return returnValue
}

function description () {
  const script = fileContents()
  const parsedScript = parseScript(script)
  const functions = getFunctions(parsedScript)
  return getJSDocComments(functions)
}

module.exports = description

