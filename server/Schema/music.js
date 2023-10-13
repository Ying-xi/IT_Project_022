const joi = require('@hapi/joi')
const mongoose = require('mongoose')


const collectionName = 'music_info'

const musicSchema = new mongoose.Schema({
    name: { type: String, required: true },
	picture: { type: String, required: true },
	file: { type: String, required: true },
	tags: { type: Array, default: ['All']},
}, { collection: collectionName })

const Music = mongoose.model('Music', musicSchema)

module.exports = {
	musicSchema,
	Music,
}