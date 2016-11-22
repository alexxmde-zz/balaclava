let mediaCtrl = require('./mediaCtrl'),
  auth = require('../auth/default'),
  multer = require('multer'),
  upload = multer({dest: 'media/'})

class MediaRoutesLoader {
  constructor() {
    mediaCtrl = new mediaCtrl()
  }

  injectRoutes(r) {
    r.get('/medias', mediaCtrl.getMedias) 
    r.get('/media/:id', mediaCtrl.getOneMedia)
    r.post('/media', upload.single('file'), auth, mediaCtrl.addMedia)
    r.put('/media/:id', upload.single('file'), auth, mediaCtrl.updateMedia)
    r.delete('/media/:id',auth, mediaCtrl.purgeMedia)
  }
}

module.exports = MediaRoutesLoader
