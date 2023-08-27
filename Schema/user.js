const joi = require('@hapi/joi')
const mongoose = require('mongoose')

const username = joi.string().alphanum().min(1).max(16).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const email = joi.string().email().required()

const user_schema = new mongoose.Schema({
    body:{
        username,
        password,
        email,
    },
})

const User = mongoose.model('User', user_schema);
module.exports = {
    user_schema,
    User,
}