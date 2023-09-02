const express = require('express')

const express_joi = require('@escook/express-joi')

const {musicSchema, Music} = require('../Schema/music')

const musicPlayer = require('../Router_handler/musicPlayer')

const path = require('path')

const router = express.Router()

router.get('/musicPlayer', musicPlayer.renderPage)

router.post('/musicPlayer:musicId', musicPlayer.player)

module.exports = router