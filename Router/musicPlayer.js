const express = require('express')
const router = express.Router()

const express_joi = require('@escook/express-joi')

const {musicSchema, Music} = require('../Schema/music')

const musicPlayer = require('../Router_handler/musicPlayer')

const path = require('path');

router.get('/musicPlayer', (req, res) => {
    const filePath = path.join(__dirname, '../Files/staticPage/test.html')
    res.sendFile(filePath)
})

router.get('/musicPlayer', async (req, res) => {
    const musics = await Music.find();
	res.status(200).send({ data: musics });
})

router.post('/musicPlayer',express_joi(musicSchema), musicPlayer.player)

module.exports = router