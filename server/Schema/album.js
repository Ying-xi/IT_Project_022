const joi = require('@hapi/joi')
const mongoose = require('mongoose')


const collectionName = 'album_info'

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
	description: { type: String, required: true },
    imageUrl: { type: String, required: true },
	comments: {type: Array, default: []},
	lists: { type: Array, default: [] },
	imageName: { type: String, required: true },
}, { collection: collectionName })

const Album = mongoose.model('Album', albumSchema)

module.exports = {
	albumSchema,
	Album,
}