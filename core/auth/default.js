let jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  let token = req.headers.authorization
  debugger

  if (!token) {
    res.status(401).send('JSON Webtoken must be provided')
  } else {
    jwt.verify(token,'askjhgdbfdghjskijsbnf',(err, decoded) => {
      if(err)
        res.status(401).send('Unauthorized')
      else
        next()
    })
  }

}
