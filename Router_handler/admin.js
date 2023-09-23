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