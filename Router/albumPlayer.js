const express = require('express')

const albumPlayer = require('../Router_handler/ablumPlayer')

const router = express.Router()

router.get('/albumPlayer', albumPlayer.renderPage)

module.exports = router