# batchqueue

queue data for an async write but do no parallel writes.

# example

say, with leveldb we might want this.
``` js
var queue =
  require('batchqueue')
    (function (batch, cb) {
      //there is a chance to add something to the batch here.
      db.batch(batch, cb)
    })

//queue foo to be written
queue({key: foo, value: blah, type: 'put'})
```

## License

MIT
