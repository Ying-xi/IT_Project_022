const {Album} = require('../Schema/album')
const jwt = require("jsonwebtoken")

exports.renderPage = async (req, res) => {
    const albums = await Album.find()
    res.status(200).send({ data: albums })
}

exports.album = async (req, res) => {
    const albumId = req.params.albumId
    const album = await Album.findById(albumId)
    if (!album) return res.status(404).send({ error: 'Album not found' })
    res.status(200).send({ data: album })
}

exports.comment = async (req, res) => {
    try {
        const albumId = req.params.albumId
        const content = req.body.content
        const user = req.user.name
        const album = await Album.findById(albumId)
        console.log(user)
        console.log(content)
        if (!album) {
            return res.status(404).json({ message: 'Album not found' })
        }

        album.comments.push({ user: user, content: content })

        await album.save()

        res.status(200).json({ message: 'Comments uploaded successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}