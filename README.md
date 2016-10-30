run-task
========

A simple cli task runner. When you would prefer to write code rather than shell
scripts in `package.json`, but would rather not spend a lot of time learning a
build tool.

Requires node v4 or newer.

## Usage

`run-task` returns a function that takes an object as an argument. The keys are
the names of tasks and the values are functions for those tasks.

* Write some functions, then pass in the ones you want to be tasks.

```javascript
// filename: run.js

const tasks = require('run-task')

function foo () {
  console.log('foo')
}

function bar () {
  console.log('bar')
}

function foobar () {
  foo()
  bar()
}

tasks({
  bar,
  foobar
})
```

Or if you want split your functions into separate files...

```javascript
// tasks/foo.js

function foo () {
  console.log('foo')
}

module.exports = foo
```

```javascript
// tasks/foobar.js

const foo = require('./foo')

function bar () {
  console.log('bar')
}

function foobar () {
  foo()
  bar()
}

module.exports = foobar
```

```javascript
// run.js

const tasks = require('run-task')
const foo = require('./tasks/foo')
const foobar = require('./tasks/foobar')

tasks({
  bar,
  foobar
})
```

* Execute using `node [script] [task]`.

```shell
$ node run foobar
```

* If you use JSDoc comments, it will pick up the description. You can also add
  a description by attaching a `description` property to the function.

```javascript
/**
 * This will show up as the task's description on stdout.
 */
function bar () {
  console.log('bar')
}
```

```javascript
function bar () {
  console.log('bar')
}

bar.description = "This will show up as the task's description on stdout."
```

* You can pass in more than one task.

```shell
$ node run bar foobar
```

* If you don't provide a task argument, it will list the available tasks.

```shell
$ node run
[run] Available tasks:
[run] bar - This will show up as the task's description on stdout.
[run] foobar
```

That's it. It just runs functions from the command line. There are no 
assumptions on what kind of tasks you want to run.

Because of this, you'll probably want to require some other modules in your
`run.js` script.

* There's a lot you can get done with the core api, read the [docs][1]
* Check out a curated list of modules at [awesome-nodejs][2].
* [shelljs][3] is a great tool for tasks (cross-platform *nix commands for node).

### Other Suggestions

* Take advantage of the [property shorthand][4].
* Name the file containing the tasks `run.js` so you can use: `node run [task]`.

[1]: https://nodejs.org/dist/latest/docs/api/index.html
[2]: https://github.com/sindresorhus/awesome-nodejs
[3]: http://shelljs.org/
[4]: https://github.com/lukehoban/es6features#enhanced-object-literals

