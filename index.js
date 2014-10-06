

module.exports = function (write, onError) {
  var batch = [], writing = false

  function drain () {
    if(writing)       return
    if(!batch.length) return

    writing = true
    var _batch = batch
    batch = []

    write(_batch, function (err) {
      writing = false
      if(onError) onError(err)
      else throw err

      setImmediate(drain)
    })

  }

  return function (data) {
    batch.push(data)
    drain()
//    setImmediate(drain)
  }

}
