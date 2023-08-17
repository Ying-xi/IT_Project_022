const express = require('express')
const router = express.Router()

const user_handler = require('../Router_handler/user')
// register router
router.post('./register',user_handler.register)
//login router
router.post('./login', user_handler.login)

module.exports = router