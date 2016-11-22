let express = require('express'),
  bodyparser = require('body-parser'),
  mongoose = require('mongoose'),
  routes = require('./routes')

mongoose.connect('mongodb://localhost/davilari-db')


let app = express()

app.use(bodyparser.urlencoded({extended : false}))
app.use(bodyparser.json())
app.use('/api', routes)

app.listen(3000, (err) => {
  if(err)
    console.trace(err)
  else
    console.log('Server up & running!')

})












