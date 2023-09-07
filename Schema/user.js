const joi = require('@hapi/joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const collectionName = 'admin'

const privateKey = 'IT-Project-022'

const user_schema = new mongoose.Schema({
    username: String,
    password: String,
}, { collection: collectionName })

user_Schema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.username},
		privateKey,
		{ expiresIn: "7d" }
	)
	return token
}

const User = mongoose.model('User', user_schema);
module.exports = {
    user_schema,
    User,
}