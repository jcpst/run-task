run-task
========

A simple-as-possible cli task runner. When you would rather write code for your 
tasks than npm run-scripts, but don't need the overhead of most other 
javascript task runners. Requires node v4 or newer.

## Usage

`run-task` returns a function that takes an object as an argument. The keys are
the names of tasks and the values are functions for those tasks.

* Execute using `node [script] [task]`.
* You can pass in more than one task.
* If you don't provide a task argument, it will list the available tasks.

```shell
$ node run bar foobar
```

That's it. There's no other functionality baked in here, just executing
functions from the command line.

You can get a lot done with [shelljs][1], which gives you cross-platform *nix 
tools. The great thing is you can use any modules you want with `run-task`.
There is a world of excellent node modules that can help you get the
functionality you need. Checkout a curated list at [awesome-nodejs][2].

### Suggestions

* Name your functions whatever you want the task names to be, that way you can 
  take advantage of the [property shorthand][3]. The object parameters are then
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

[1]: http://shelljs.org/
[2]: https://github.com/sindresorhus/awesome-nodejs
[3]: https://github.com/lukehoban/es6features#enhanced-object-literals

