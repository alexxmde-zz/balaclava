let categoryCtrl = require('./categoryCtrl')

class CategoryRoutesLoader {
  constructor() {
    categoryCtrl = new categoryCtrl()
  }

  injectRoutes(r) {
    r.get('/categories', categoryCtrl.getCategories)
    r.post('/category', categoryCtrl.addCategory)
    r.get('/category/:id', categoryCtrl.getOneCategory)
    r.put('/category/:id', categoryCtrl.updateCategory)
    r.delete('/category/:id', categoryCtrl.purgeCategory)
  }

}

module.exports = CategoryRoutesLoader
