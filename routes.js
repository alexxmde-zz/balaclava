let express = require('express'),
  userRouter = require('./core/user/routes/userRouter'),
  categoryRouter = require('./core/category/categoryRoutes'),
  mediaRouter = require('./core/media/mediaRoutes'),
  router = express.Router()


class Routes { 

  constructor() {
    userRouter = new userRouter()
    categoryRouter = new categoryRouter()
    mediaRouter = new mediaRouter()
  }

  LoadAllRoutes(router) {

  userRouter.injectRoutes(router)
  categoryRouter.injectRoutes(router)
  mediaRouter.injectRoutes(router)

  }

}

let R = new Routes()
R.LoadAllRoutes(router)

module.exports = router
