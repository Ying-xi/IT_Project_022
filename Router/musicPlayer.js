const express = require('express')
const router = express.Router()

const express_joi = require('@escook/express-joi')

const {musicSchema} = require('../Schema/music')

const musicPlayer = require('../Router_handler/musicPlayer')

router.post('./musicPlayer',express_joi(musicSchema), musicPlayer.player)

module.exports = router