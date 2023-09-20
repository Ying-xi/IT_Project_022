const express = require('express')
const router = express.Router()

const admin = require('../Router_handler/admin')
const auth = require('../auth')

const path = require('path')

router.get('/admin', auth, admin.renderPage)
router.post('/admin', auth, admin.saveMusic)
router.put('/admin/:musicId', auth, admin.updateMusic)
router.delete('/admin/:musicId', auth, admin.deleteMusic)

module.exports = router