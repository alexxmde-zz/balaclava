let productModel = require('./productModel'),
    mediaModel = require ('../media/mediaModel')

class ProductCtrl {
  constructor() {
  }

  addProduct(req, res) {
    new productModel(req.body).save((err, product) => {
      if (!err) return res.json(product)
      else return res.status(500).json(err)
    })
    
  }

  updateProduct(req, res) {
    productModel.findByIdAndUpdate(req.params.id,
      {$set : req.body},
      {'new' : true},
      (err, product) => {
        if (!err) return res.json(product)
        else return res.status(500).json(err)
      })
  }

  getOneProduct(req, res) {
    productModel.findOne(req.body, (err, product) => {
      if (!err) return res.json(product)
      else return res.status(500).json(err)
    })
  }

  getProducts(req, res) {
    productModel.find({}, (err, products) => {
      if (!err) return res.json(products)
      else return res.status(500).json(err)
    })
  }

  purgeProduct(req, res) {
    productModel.findOneAndRemove({'_id' : req.params.id}, (err) => {
      if (!err) return res.send('Product removed')
      else return res.status(500).json(err)
    })
  }

  addMedia(req, res) {
    let id = req.params.id
    productModel.findOne({'_id' : id}, (err, product) => {
      if (!err) {
        mediaModel.findOne({'url' : req.body.url}, (err, media)=> {
          if(!err) {
            product.medias.push(media)
            product.save((err, product) => {
              if(!err) return res.json(media)
              else return res.status(500).json(err)
            })
          } else res.status(500).json(err)
        })
      } else res.status(500).json(err)
      
    })
  }

  setMainMedia(req, res) {
    let id = req.params.id
    productModel.findOne({'_id' : id}, (err, product) => {
      if (!err) {
        mediaModel.findOne({'url' : req.body.url}, (err, media) => {
          if (!err) {
            product.mainMedia = media
            product.save((err, product) => {
              if (!err) return res.json(product)
              else return res.status(500).json(err)
            })
          } else return res.status(500).json(err)
        })
      }
      else return res.status(500).json(err)
    })
  }

}

module.exports = ProductCtrl
