const {Album} = require('../Schema/album')

exports.renderPage = async (req, res) => {
    const albums = await Album.find()
    res.status(200).send({ data: albums })
}