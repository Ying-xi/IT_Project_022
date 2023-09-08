const express = require('express')
const router = express.Router()

const user_handler = require('../Router_handler/user')

const express_joi = require('@escook/express-joi')

const {userSchema} = require('../Schema/user')

const path = require('path')

//login router
router.post('/login', user_handler.login)

module.exports = router