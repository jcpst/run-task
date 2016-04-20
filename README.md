run-task
========

A simple-as-possible task runner. When you would rather write code for your 
tasks than npm run-scripts, but don't need the overhead of most other 
javascript task runners. Requires node v4 or newer.

## Usage

`run-task` returns a function that takes an object as an argument. The keys are
the names of tasks and the values are functions for those tasks.

Execute using `node [script] [tasknames]`:

```shell
$ node run bar foobar ...
```

> If you don't provide a task argument, it will display the available tasks

### Suggestions

* Name your functions whatever you want the task names to be, that way you can 
  take advantage of the [property shorthand][1]. The object parameters are then
  just a list of exported functions.
* Name the file containing the tasks `run.js`, so that tasks are called like 
  `node run [task]`.

### Examples

```javascript
// filename: run.js

require('run-task')({
  bar, foobar
})

function privateFoo () {
  console.log('foo')
}

function bar () {
  console.log('foobar')
}

function foobar () {
  privateFoo()
  bar()
}
```

[1]: https://github.com/lukehoban/es6features#enhanced-object-literals
