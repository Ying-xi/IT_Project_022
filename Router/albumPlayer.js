const express = require('express')
const auth = require('../auth')

const albumPlayer = require('../Router_handler/albumPlayer')

const router = express.Router()

router.get('/albumPlayer', albumPlayer.renderPage)

router.get('/albumPlayer/:albumId', albumPlayer.album)
router.post('/albumPlayer/:albumId',auth, albumPlayer.comment)

module.exports = router