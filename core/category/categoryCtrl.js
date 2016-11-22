let categoryModel = require('./categoryModel.js')

class CategoryCtrl {
  constructor() {

  }
  getCategories(req, res) {
    categoryModel.find({}, (err, categories) => {
      if (!err) {
        res.json(categories)
      } else {
        res.status(500).json(err)
      }
    })
  }

  addCategory(req, res) {
    new categoryModel(req.body).save((err, user)=>{
      if (!err) {
        res.json(user)
      }
      else {
        res.status(500).json(err)
      }
    })
  }

  getOneCategory(req, res) {
    categoryModel.findOne(req.body, (err, category) => {
      if (err)
        return res.status(500).json(err)

      return res.json(category)
    })
  }

  updateCategory(req, res) {
    categoryModel.findByIdAndUpdate(req.params.id,
      {$set: req.body},
      {'new' : true},
      (err, category) => {
        if (err) return res.status(500).json(err)

        return res.json(category)
      }
    )
  }

  purgeCategory(req, res) {
    categoryModel.remove({'_id' : req.params.id}, (err) => {
      if(err) return res.status(500).json(err)

      return res.send('Category: ' + req.params.id + ' Deleted.')
    })
  }

}

module.exports = CategoryCtrl
