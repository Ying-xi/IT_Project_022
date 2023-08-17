const express = require('express')
const router = express.Router()

const home = require('../Router_handler/homePage')

router.post('./home', home.homePage)

module.exports = router