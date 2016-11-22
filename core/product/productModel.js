let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  productSchema = new Schema({

    title: {type: String, required:true},
    category: {type: Schema.ObjectId, ref:'Category', required:true},
    active: {type: Boolean, required: true},
    regDate: {type: Date, default: Date.now},
    mainMedia: {type: Schema.ObjectId, ref: 'Media' },
    medias: [{type: Schema.ObjectId, ref: 'Media'}],
    price: {type: Number},

  })

module.exports = mongoose.model('Product', productSchema)
