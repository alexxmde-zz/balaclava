let mongoose = require('mongoose'),
  Schema = mongoose.Schema
categorySchema = new Schema({

  title: {type: String, required: true},
  fatherCategory: {type: Schema.ObjectId, ref: 'Category'},
  childCategories: [{type: Schema.ObjectId, ref: 'Category'}],
  regDate: {type:Date, default: Date.now}

})

module.exports = mongoose.model('Category',categorySchema)
