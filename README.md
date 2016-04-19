run-task
========

A simple-as-possible task runner. When you would rather write code for your 
tasks than npm run-scripts, but don't need the overhead of most other 
javascript task runners. Requires node v4 or newer.

## Usage

`run-task` returns a function that has an object parameter, with the keys being
tasks and the values being functions for those tasks.

Execute using `node [script] [taskname]`:

```shell
$ node run foobar
```

If you don't provide a task argument, it will display the available tasks

### Suggestions

* name your functions whatever you want the task names to be, that way you can 
  take advantage of the [property shorthand][1].
* name the file containing the tasks `run.js`, that way you can call 
  `node run [task]`, which will feel familiar to those used to `npm run [task]`

### Example

```javascript
// filename: run.js

require('run-task')({
  taskOne,
  taskTwo
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
