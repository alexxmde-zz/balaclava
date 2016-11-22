let mongoose = require('mongoose')
Schema = mongoose.Schema,

  mediaSchema = new Schema({
    url: {type: String},
    type: {type: String}
  })

module.exports = mongoose.model('Media', mediaSchema)
