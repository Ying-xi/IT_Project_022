const {Music} = require('../Schema/music')
const {Album} = require('../Schema/album')

exports.renderPage = async (req, res) => {
	const musics = await Music.find()
	res.status(200).send({ data: musics })
}

exports.saveMusic = async (req, res) => {
	const music = await Music(req.body).save()
	res.status(201).send({ data: music, message: "Music uploaded successfully" })
}

exports.updateMusic = async (req, res) => {
	const music = await Music.findByIdAndUpdate(req.params.musicId, req.body, {
		new: true,
	})
	res.send({ data: music, message: "Update successfully" })
}

exports.deleteMusic = async (req, res) => {
	await Music.findByIdAndDelete(req.params.musicId)
	res.status(200).send({ message: "Music deleted sucessfully" });
}











exports.renderAlbumPage = async (req, res) => {
	const albums = await Album.find()
	res.status(200).send({ data: albums })
}

exports.saveAlbum = async (req, res) => {
	const album = await Album(req.body).save()
	res.status(201).send({ data: album, message: "Album uploaded successfully" })
}

exports.updateAlbum = async (req, res) => {
	const album = await Album.findByIdAndUpdate(req.params.albumId, req.body, {
		new: true,
	})
	res.send({ data: album, message: "Update successfully" })
}

exports.deleteAlbum = async (req, res) => {
	await Album.findByIdAndDelete(req.params.albumId)
	res.status(200).send({ message: "Album deleted sucessfully" });
}