const express = require('express')
const router = express.Router()

const user_handler = require('../Router_handler/user')

const express_joi = require('@escook/express-joi')

const {userSchema} = require('../Schema/user')

const path = require('path');
router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '../Files/login/index.html')
    res.sendFile(filePath)
})
// register router
router.post('/register', express_joi(userSchema), user_handler.register)
//login router
router.post('/login', user_handler.login)

module.exports = router