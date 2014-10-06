
var batchqueue = require('./')
var assert = require('assert')

require('interleavings').test(function (async) {

  var output = []

  var queue = batchqueue(function (batch, cb) {
    batch.forEach(function (data) {
      output.push(data)
    })

    async(cb)()
  }, function (err) {
    if(err) throw err
    console.log(output.length)
    for(var i = 0; i < 100; i++)
      assert.equal(output[i], i)
    async.done()
  })

  for(var i = 0; i < 100; i++) {
    queue(i)
  }

})
