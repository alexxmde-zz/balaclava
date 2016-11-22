let m = require('mongoose'),
  s = m.Schema,

  u = new s({
    username: {type: String, required: true, unique:true},
    password:{type:String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    lastName: {type: String, required: true},
    regDate: {type: Date, default: Date.now},
    active: {type: Boolean, required:true},
  })



module.exports = m.model('User', u)
