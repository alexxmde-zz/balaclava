let categoryCtrl = require('./categoryCtrl'),
    authCheck = require('../auth/default')

class CategoryRoutesLoader {
  constructor() {
    categoryCtrl = new categoryCtrl()
  }

  injectRoutes(r) {
    r.get('/categories', categoryCtrl.getCategories)
    r.post('/category', authCheck, categoryCtrl.addCategory)
    r.get('/category/:id',categoryCtrl.getOneCategory)
    r.put('/category/:id',authCheck, categoryCtrl.updateCategory)
    r.delete('/category/:id', authCheck, categoryCtrl.purgeCategory)

  
  }

}

module.exports = CategoryRoutesLoader
