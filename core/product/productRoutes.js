let productCtrl = require('./productCtrl'),
  auth = require('../auth/default')

class ProductRoutesLoader {
  constructor() {
    productCtrl = new productCtrl()
  }

  injectRoutes(r) {
    r.get('/products', productCtrl.getProducts)
    r.get('/product/:id', productCtrl.getOneProduct)
    r.post('/product', auth, productCtrl.addProduct)
    r.put('/product/:id', auth, productCtrl.updateProduct)
    r.delete('/product/:id', auth, productCtrl.deactivateProduct)
  }

}

module.exports = ProductRoutesLoader
