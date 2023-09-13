const {Music} = require('../Schema/music')

const path = require('path')

exports.renderPage = async (req, res) => {
    const musics = await Music.find()
    //if(!musics) return res.status(404).send("no music available")
    res.status(200).send({ data: musics })
}

exports.player = async (req, res)=>{
    const musicId = req.params.musicId
    const music = await Music.findById(musicId)
    if(!music) return res.status(404).send("not found")
    res.status(200).send({ data: music })
}

