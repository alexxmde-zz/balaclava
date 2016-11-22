let express = require('express'),
  userRouter = require('./core/user/routes/userRouter'),
  categoryRouter = require('./core/category/categoryRoutes'),
  mediaRouter = require('./core/media/mediaRoutes'),
  productRouter = require('./core/product/productRoutes'),
  router = express.Router()


class Routes { 

  constructor() {
    userRouter = new userRouter()
    categoryRouter = new categoryRouter()
    mediaRouter = new mediaRouter()
    productRouter = new productRouter()
  }

  LoadAllRoutes(router) {
    userRouter.injectRoutes(router)
    categoryRouter.injectRoutes(router)
    mediaRouter.injectRoutes(router)
    productRouter.injectRoutes(router)

  }

}

let R = new Routes()
R.LoadAllRoutes(router)

module.exports = router
