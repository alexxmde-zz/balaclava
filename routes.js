let express = require('express'),
  userRouter = require('./core/user/routes/userRouter'),
  categoryRouter = require('./core/category/categoryRoutes'),
  router = express.Router()


class Routes { 

  constructor() {
    userRouter = new userRouter()
    categoryRouter = new categoryRouter()
  }

  LoadAllRoutes(router) {

  userRouter.injectRoutes(router)
  categoryRouter.injectRoutes(router)

  }

}

let R = new Routes()
R.LoadAllRoutes(router)

module.exports = router
