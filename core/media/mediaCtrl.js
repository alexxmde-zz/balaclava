let mediaModel = require('./mediaModel'),
  globals = require('../utils/globals'),
  fs = require('fs')

class mediaCtrl {
  constructor() {}

  addMedia(req, res) {
    
    if (req.file) { //If it's a file upload.
      let media = new mediaModel({
        'type' : req.body.type,
        'url' : globals.baseUrl + '/media/'+ req.file.filename
      })

      media.save((err,media)=> {
        if (!err) return res.json(media)
        else return res.status(500).json(err)
      })

    } else { //Else it's an external URL.
      mediaModel.save(req.body, (err, media) => {
        if (!err) return res.json(media)
        else return res.status(500).json(err)
      })
    }
  }

  getMedias(req, res) {
    mediaModel.find({}, (err, medias) => {
      if (err) return res.status(500).json(err)
      else return res.json(medias)
    })
  }

  getOneMedia(req, res) {
    mediaModel.findOne(req.body, (err, medias) => {
      if (err) return res.status(500).json(err)
      else return res.json(medias)
    })
  }

  updateMedia(req, res) {
    let media = req.body
    if (req.file) {
      media = {
        'type' : req.body.type,
        'url' : globals.baseUrl + '/media/' + req.file.filename
      }
    }

    mediaModel.findByIdAndUpdate(req.params.id,
      {$set : media},
      {'new' : true},
      (err, media) => {
        if(err) return res.status(500).json(err)
        else return res.json(media)
      })
  }

  purgeMedia(req, res) {
    mediaModel.findOne({'_id' : req.params.id}, (err, media) => {
      if (!err) {
       let  arrUrl = media.url.split('/')
        fs.access('media/' + arrUrl[arrUrl.length -1], (err) => {
          if (err) return res.status(500).json(err)
          fs.unlink('media/' + arrUrl[arrUrl.length -1], (err) => {
            if(err) return res.status(500).json(err)
            mediaModel.findOneAndRemove({'_id' : req.params.id},(err) => {
              if (err) return res.status(500).json(err)
              else res.send("Media removed")
            })

          })
        })
      } else res.status(404).send('Media not found')
    })
  }
}

module.exports = mediaCtrl
