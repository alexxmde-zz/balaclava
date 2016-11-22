let userCtrl = require('../../user/controllers/userCtrl'),
    auth = require('../../auth/default')

class UserRoutesLoader {
  constructor() {
    userCtrl = new userCtrl()
  }

  injectRoutes(r) {

    r.get('/user/test', userCtrl.testAPI) //Test
    r.post('/user/login', userCtrl.generateAuthToken) //Login
    
    //CRUD
    r.put('/user/:userId', auth, userCtrl.updateUser) //Update
    r.post('/user/register', auth, userCtrl.registerUser) //Register
    r.get('/user/:userId', auth, userCtrl.getOneUser) //Retrive One
    r.get('/users', auth, userCtrl.getUsers) //Retrive All
    r.delete('/user/:userId', auth, userCtrl.deactivateUser) //Delete User
    
  }


}

module.exports = UserRoutesLoader
