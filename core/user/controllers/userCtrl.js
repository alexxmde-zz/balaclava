let userModel = require('../model/userModel'),
  jwt = require('jsonwebtoken')

/**
 * Handle the User's logic.
 * 
 */
class UserCtrl {
  /**
   * Register a user.
   * @param {HttpRequest} req - express request
   * @param {HttpResponse} res - express response
   *
   */

  registerUser(req, res) {
    return new Promise((resolve, reject)=> {
      let newUser = new userModel(req.body)
      newUser.save()
        .then((user) => {
          res.status(200).json(user)
        }).catch((err) => { 
          res.status(500).json(err)
        })
    })

  }

  /**
   * Change a user active property to false
   * @param {HttpRequest} req - express request
   * @param {HttpRequest} res - express response
   *
   */
  deactivateUser(req, res) {
    return new Promise((resolve, reject) => {
      userModel.findByIdAndUpdate(
        req.params.userId,
        {$set: {'active' : false}},
        {'new' : true },
        (err, user) => {
          if(!err) res.json(user)
          else res.status(500).json(user)
        })

    })
  }
  /**
   * Change a user active property to true
   * @param {HttpRequest} req - express request
   * @param {HttpResponse} res - express response
   *
   */
  activateUser(req, res) {
    return new Promise((resolve, reject) => {
      userModel.findByIdAndUpdate(
        req.params.userId,
        {$set: {'active' : true}},
        {'new' : true },
        (err, user) => {
          if(!err) res.json(user)
          else res.status(500).json(user)
        })

    })
  }
  /**
   * Get all users.
   * @param {HttpRequest} req - express request
   * @param {HttpRequest} res - express response
   *
   */
  getUsers (req, res) {
    return new Promise((resolve, reject) => {
      userModel.find({}, (err, users) => {
        if (err)
          return res.status(500).json(err)
        else 
          return res.status(200).json(users)
      })
    })
  }

  /**
   * Retrive a single user.
   * @param {HttpRequest} req - express request
   * @param {HttpResponse} res - express response
   */
  getOneUser (req, res) {
    return new Promise((resolve, reject) => {
      userModel.findOne(req.body, (err, user) => {
        if (err)
          res.status(500).json(err)
        else
          res.status(200).json(user)
      })
    })
  }

  /**
   * Update a user.
   * @param {HttpRequest} req - express request
   * @param {HttpResponse} res - express response
   */
  updateUser(req, res) {
    return new Promise((resolve, reject) => {
      userModel.findByIdAndUpdate(
        req.params.userId,
        {$set : req.body}, 
        {'new' : true},
        (err, user) => {
          if(!err)
            res.status(200).json(user)
          else
            res.status(500).json(err)
        }
      )


      userModel.findOne({'_id' : userId}, (err, user) => {
        user = newUser
        newUser.save((user) => {
          res.json(user)
        })

      })
    })
  }

  /**
   * Generate the authentication webToken
   * @param {HttpRequest} req - Express request
   * @param {HttpResponse} res - Express response
   */
  generateAuthToken(req, res) {
    return new Promise((resolve, reject) => {
      let reqUser = req.body
      userModel.findOne(reqUser, (err, user) => { //Fetch database for user.
        if (!err) {
          //validate user's credentials.
          if (user && user.password == reqUser.password && user.username == reqUser.username) {
            let token = jwt.sign({'user': user}, 'askjhgdbfdghjskijsbnf') //generate auth token.
            res.send(token) //send the token as the response.
          } else {
            res.status(404).send("User not found")
          }
        } else {
          res.status(500).send(err) //render mongoose's error.
        }
      })
    })
  }

  /**
   * Function used for test purposes
   * @param {HttpRequest} req -  Express request
   * @param {HttpResponse} res -  Express response
   */
  testAPI(req, res) {
    res.status(200).send('Olá =)')
  }
}

module.exports = UserCtrl
