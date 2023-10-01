const joi = require('@hapi/joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const collectionName = 'admin'

const privateKey = 'IT-Project-022'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
	isAdmin: { type: Boolean, default: false },
}, { collection: collectionName })

// generate tokens
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.username, isAdmin: this.isAdmin},
		privateKey,
		{ expiresIn: "1d" }
	)
	return token
}

const User = mongoose.model('User', userSchema);
module.exports = {
    userSchema,
    User,
}