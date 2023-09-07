const {Music} = require('../Schema/music')

const path = require('path')

exports.renderPage = (req, res) => {
    const filePath = path.join(__dirname, '../Files/staticPage/test.html')
    res.sendFile(filePath, async (err) => {
        if (err) {
            console.error(err)
        } else {
            const musics = await Music.find()
            res.status(200).send({ data: musics })
        }
    })
}

exports.player = async (req, res)=>{
    const musicId = req.params.musicId
    const music = await Music.findById(musicId)
    if(!music) return res.status(404).send("not found")
    res.status(200).send({ data: music })
}

