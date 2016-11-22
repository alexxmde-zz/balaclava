let userCtrl = require('../../user/controllers/userCtrl')

class UserRoutesLoader {
  constructor() {
    userCtrl = new userCtrl()
  }

  injectRoutes(r) {

    r.get('/user/test', userCtrl.testAPI) //Test
    r.post('/user/login', userCtrl.generateAuthToken) //Login
    
    //CRUD
    r.put('/user/:userId', userCtrl.updateUser) //Update
    r.post('/user/register', userCtrl.registerUser) //Register
    r.get('/user/:userId', userCtrl.getOneUser) //Retrive One
    r.get('/users', userCtrl.getUsers) //Retrive All
    r.delete('/user/:userId', userCtrl.deactivateUser) //Delete User
    
  }


}

module.exports = UserRoutesLoader
