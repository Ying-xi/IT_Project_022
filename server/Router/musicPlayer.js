const express = require('express')

const musicPlayer = require('../Router_handler/musicPlayer')

const router = express.Router()

router.get('/musicPlayer', musicPlayer.renderPage)

router.post('/musicPlayer/:musicId', musicPlayer.player)

module.exports = router