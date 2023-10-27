const express = require('express')

const albumPlayer = require('../Router_handler/albumPlayer')

const router = express.Router()

router.get('/albumPlayer', albumPlayer.renderPage)

router.get('/albumPlayer/:albumId', albumPlayer.album)
router.post('/albumPlayer/:albumId', albumPlayer.comment)

module.exports = router