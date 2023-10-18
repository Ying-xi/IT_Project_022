const {Music} = require('../Schema/music');
const {Album} = require('../Schema/album');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');


exports.saveMusic = (req, res) => {
	const form = new multiparty.Form();
	// use form.parse method to parse form data: it will parse the form data in the request into fields and files objects.
	// fields contains key-value pairs of form fields, files contains uploaded files.
	form.parse(req, (err, fields, files) => {
		if (err) {
			console.error('Error parsing form data:', err);
			res.status(500).send({
				error: 'Error parsing form data.'
			});
			return;
		}
		// get the uploaded music file (MP3)
		const musicFile = files.file[0];
		const musicFilename = fields.name[0] + '.mp3';
		const musicTempPath = musicFile.path;

		// get the uploaded image file (JPG)
		const imageFile = files.picture[0];
		const imageFilename = fields.name[0] + '.jpg';
		const imageTempPath = imageFile.path;

		// specify the storage path and filename for the music file
		const musicDestination = path.join(__dirname, '../Default_music/Musics');
		const musicTargetPath = path.join(musicDestination, musicFilename);

		// specify the storage path and filename for the image file
		const imageDestination = path.join(__dirname, '../Default_music/Images');
		const imageTargetPath = path.join(imageDestination, imageFilename);

		// save the MUSIC file to the storage path
		fs.rename(musicTempPath, musicTargetPath, (musicError) => {
			if (musicError) {
				console.error('Error moving the music file:', musicError);
				res.status(500).send({
					error: 'Error moving the music file.'
				});
				return;
			}

			// save the IMAGE file to the storage path
			fs.rename(imageTempPath, imageTargetPath, async (imageError) => {
				if (imageError) {
					console.error('Error moving the image file:', imageError);
					res.status(500).send({
						error: 'Error moving the image file.'
					});
					return;
				}

				// After the image is saved, create a music document and save it to the database
				try {
					const music = new Music({
						name: fields.name[0],
						tags: fields.tags[0].split(','),
						file: path.relative(__dirname, musicTargetPath),
						picture: path.relative(__dirname, imageTargetPath),
					});
					// asynchronous save music document
					try {
						const savedMusic = await music.save();
						res.status(201).send({
							data: savedMusic,
							message: 'Music uploaded successfully',
						});
					} catch (saveError) {
						console.error('Error saving music:', saveError);
						res.status(500).send({
							error: 'Error saving music.'
						});
					}
				} catch (error) {
					console.error('Error uploading music:', error);
					res.status(500).send({
						error: 'An error occurred while uploading music'
					});
				}
			});
		});
	});
};



exports.updateMusic = (req, res) => {
	const form = new multiparty.Form();
	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error('Error parsing form data:', err);
			res.status(500).send({
				error: 'Error parsing form data.'
			});
			return;
		}
		// get the music data
		const music = await Music.findById(req.params.musicId);
		if (!music) {
			res.status(404).send({
				error: 'Music not found'
			});
			return;
		}
		// set the new music data path
		if (fields.file) {
			// get the uploaded music file (MP3)
			const musicFile = files.file[0];
			const musicTempPath = musicFile.path;
			const musicFilename = fields.name[0] + '.mp3';
			// specify the storage paths and file names
			const musicDestination = path.join(__dirname, '../Default_music/Musics');
			const musicTargetPath = path.join(musicDestination, musicFilename);

		}
		// set the new image data path
		if (fields.picture) {
			// get the uploaded image file (JPG)
			const imageFile = files.picture[0];
			const imageTempPath = imageFile.path;
			const imageFilename = fields.name[0] + '.jpg';
			// specify the storage paths and file names
			const imageDestination = path.join(__dirname, '../Default_music/Images');
			const imageTargetPath = path.join(imageDestination, imageFilename);
		}


		// move the music file to the storage path
		fs.rename(musicTempPath, musicTargetPath, (musicError) => {
			if (musicError) {
				console.error('Error moving the music file:', musicError);
				res.status(500).send({
					error: 'Error moving the music file.'
				});
				return;
			}
			// move the image file to the storage path
			fs.rename(imageTempPath, imageTargetPath, async (imageError) => {
				if (imageError) {
					console.error('Error moving the image file:', imageError);
					res.status(500).send({
						error: 'Error moving the image file.'
					});
					return;
				}
				// create or update the music document
				music.name = fields.name[0];
				music.tags = fields.tags[0].split(',');
				// Check if the 'file' and 'picture' fields exist in the request.
				// If not, do not update the file paths.
				if (fields.file && fields.picture) {
					music.file = path.relative(__dirname, musicTargetPath);
					music.picture = path.relative(__dirname, imageTargetPath);
				}
				try {
					const updatedMusic = await music.save();
					res.status(200).send({
						data: updatedMusic,
						message: 'Music updated successfully',
					});
				} catch (updateError) {
					console.error('Error updating music:', updateError);
					res.status(500).send({
						error: 'Error updating music.'
					});
				}
			});
		});
	});
};


// delete after the debug of the updateMusic
exports.updateMusic1 = async (req, res) => {
	const music = await Music.findByIdAndUpdate(req.params.musicId, req.body, {
		new: true,
	})
	res.send({ data: music, message: "Update successfully" })
}





exports.renderPage = async (req, res) => {
	const musics = await Music.find()
	res.status(200).send({ data: musics })
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