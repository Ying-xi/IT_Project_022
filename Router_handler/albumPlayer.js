const {Album} = require('../Schema/album')

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