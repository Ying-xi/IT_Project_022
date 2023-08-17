const express = require('express')
const router = express.Router()

const musicPlayer = require('../Router_handler/musicPlayer')

router.post('./musicPlayer', musicPlayer.player)

module.exports = router