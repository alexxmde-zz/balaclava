let fs = require('fs'),

  content = fs.readFileSync('core/utils/env.json'),
  json = JSON.parse(content)
  
module.exports = json.dev
