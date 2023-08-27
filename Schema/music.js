const joi = require('@hapi/joi')
const mongoose = require('mongoose')


const musicSchema = new mongoose.Schema({
	body:{
        name: joi.string().required(),
		picture: joi.string().required(),
		file: joi.string().required(),
    },
});

const Music = mongoose.model('Music', musicSchema)

module.exports = {
	musicSchema,
	Music,
}