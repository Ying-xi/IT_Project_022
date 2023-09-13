const joi = require('@hapi/joi')
const mongoose = require('mongoose')


const collectionName = 'music_info'

const musicSchema = new mongoose.Schema({
    name: joi.string().required(),
	picture: joi.string().required(),
	file: joi.string().required(),
	
}, { collection: collectionName })

const Music = mongoose.model('Music', musicSchema)

module.exports = {
	musicSchema,
	Music,
}