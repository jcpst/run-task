run-task
========

A simple-as-possible cli task runner. When you would rather write code for your 
tasks than npm run-scripts, but don't need the overhead of most other 
javascript task runners. Requires node v4 or newer.

## Usage

`run-task` returns a function that takes an object as an argument. The keys are
the names of tasks and the values are functions for those tasks.

* Write some tasks, then pass public functions into the `require` 
  expression.

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

* Execute using `node [script] [task]`.
* You can pass in more than one task.
* If you don't provide a task argument, it will list the available tasks.

```shell
$ node run bar foobar
```

That's it, it just runs functions from the command line. You are free to write
your tasks in any way you want with whatever modules you want.

And there is a great big world of node modules that can help you get the
functionality you need. 

* Checkout a curated list at [awesome-nodejs][2].
* [shelljs][1] is a great option (cross-platform *nix tools for node).

### Suggestions

* Name your functions whatever you want the task names to be, that way you can 
  take advantage of the [property shorthand][3].
* Name the file containing the tasks `run.js` so you can use: `node run [task]`.

[1]: http://shelljs.org/
[2]: https://github.com/sindresorhus/awesome-nodejs
[3]: https://github.com/lukehoban/es6features#enhanced-object-literals

