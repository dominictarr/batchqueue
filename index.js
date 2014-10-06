

module.exports = function (write, listener) {
  var batch = [], writing = false

  if(!listener) listener = function (err) { if(err) throw err }

  function drain () {
    if(writing)       return
    if(!batch.length) return

    writing = true
    var _batch = batch
    batch = []

    write(_batch, function (err) {
      writing = false
      if(err) listener(err) //error
      if(!batch.length) listener() //drain
      else setImmediate(drain)
    })

  }

  return function (data) {
    batch.push(data)
    setImmediate(drain)
  }

}
