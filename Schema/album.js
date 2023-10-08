const joi = require('@hapi/joi')
const mongoose = require('mongoose')


const collectionName = 'album_info'

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
	picture: { type: String, required: true },
    description: { type: String, required: true },
	songs: { type: Array, default: [] },
}, { collection: collectionName })

const Album = mongoose.model('Album', albumSchema)

module.exports = {
	albumSchema,
	Album,
}