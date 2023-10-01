const express = require('express')
const router = express.Router()

const admin = require('../Router_handler/admin')
const auth = require('../auth')
const isAdmin = require("../admin");

router.get('/admin', auth, admin.renderPage)
router.post('/admin', auth, admin.saveMusic)
router.put('/admin/:musicId', auth, admin.updateMusic)
router.delete('/admin/:musicId', isAdmin, admin.deleteMusic)

module.exports = router