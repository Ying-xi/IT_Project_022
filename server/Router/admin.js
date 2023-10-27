const express = require('express')
const router = express.Router()

const admin = require('../Router_handler/admin')
const auth = require('../auth')
const isAdmin = require("../admin");

router.get('/admin', isAdmin, admin.renderPage)
router.post('/admin', isAdmin, admin.saveMusic)
router.put('/admin/:musicId', isAdmin, admin.updateMusic)
router.delete('/admin/:musicId', isAdmin, admin.deleteMusic)

router.get('/albumAdmin', isAdmin, admin.renderAlbumPage)
router.post('/albumAdmin', isAdmin, admin.saveAlbum)
router.put('/albumAdmin/:albumId', isAdmin, admin.updateAlbum)
router.delete('/albumAdmin/:albumId', isAdmin, admin.deleteAlbum)

module.exports = router