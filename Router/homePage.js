const express = require('express')
const router = express.Router()

const home = require('../Router_handler/homePage')

const path = require('path')

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../Files/staticPage/combination.html')
    res.sendFile(filePath)
})

router.post('/', home.homePage)

module.exports = router