'use strict'

function some () {
  console.log('runs some task')
}

some.description = 'a task that can be run'

function somethingElse () {
  console.log('runs another task')
}

require('../index')({
  some,
  somethingElse
})
