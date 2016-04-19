run-task
========

Usage:

Just pass in tasks as properties on an object with functions as the values. If
you are using node v4 or newer, you can use the property name shortcut, which is
also a list of available tasks:

```javascript
// filename: run.js

require('tasky')({
  taskOne,
  taskTwo
})

function taskOne () {
  console.log('task one')
}

function taskTwo () {
  console.log('task two')
}
```

Then you execute using node:

```shell
node run taskOne
```
