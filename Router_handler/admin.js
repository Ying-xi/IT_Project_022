const {Music} = require('../Schema/music');
const {Album} = require('../Schema/album');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

// original version
exports.saveMusic1 = (req, res) => {
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




exports.saveMusic = (req, res) => {
	const form = new multiparty.Form();

	// use form.parse method to parse form data: it will parse the form data in the request into fields and files objects.
	// fields contains key-value pairs of form fields, files contains uploaded files.
	form.parse(req, async (err, fields, files) => {
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

		// get the uploaded image file (JPG)
		const imageFile = files.picture[0];
		const imageFilename = fields.name[0] + '.jpg';

		// specify the storage path and filename for the music file
		const musicDestination = path.join(__dirname, '../Default_music/Musics');
		const musicTargetPath = path.join(musicDestination, musicFilename);

		// specify the storage path and filename for the image file
		const imageDestination = path.join(__dirname, '../Default_music/Images');
		const imageTargetPath = path.join(imageDestination, imageFilename);

		// create read and write streams for music file
		const musicReadStream = fs.createReadStream(musicFile.path);
		const musicWriteStream = fs.createWriteStream(musicTargetPath);

		// create read and write streams for image file
		const imageReadStream = fs.createReadStream(imageFile.path);
		const imageWriteStream = fs.createWriteStream(imageTargetPath);

		// handle errors during file streams
		musicReadStream.on('error', (error) => {
			console.error('Error reading music file:', error);
			cleanupAndRespond(res, musicFile.path, imageFile.path, 'Error reading music file.');
		});

		musicWriteStream.on('error', (error) => {
			console.error('Error writing music file:', error);
			cleanupAndRespond(res, musicFile.path, imageFile.path, 'Error writing music file.');
		});

		imageReadStream.on('error', (error) => {
			console.error('Error reading image file:', error);
			cleanupAndRespond(res, musicFile.path, imageFile.path, 'Error reading image file.');
		});

		imageWriteStream.on('error', (error) => {
			console.error('Error writing image file:', error);
			cleanupAndRespond(res, musicFile.path, imageFile.path, 'Error writing image file.');
		});

		// pipe the read and write streams for music file
		musicReadStream.pipe(musicWriteStream);

		// handle finish event for music write stream
		musicWriteStream.on('finish', async () => {
			// pipe the read and write streams for image file
			imageReadStream.pipe(imageWriteStream);

			// handle finish event for image write stream
			imageWriteStream.on('finish', async () => {
				// After the files are saved, create a music document and save it to the database
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

				// clean up temporary files
				cleanupTempFiles(musicFile.path, imageFile.path);
			});
		});
	});
};




exports.saveAlbum = (req, res) => {
    const form = new multiparty.Form();

    // Use form.parse method to parse form data: it will parse the form data in the request into fields and files objects.
    // fields contains key-value pairs of form fields, files contains uploaded files.
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).send({
                error: 'Error parsing form data.'
            });
            return;
        }

        // Get the uploaded album cover image
        const imageFile = files.picture[0];
        const imageFilename = fields.name[0] + '.jpg';

        // Specify the storage path and filename for the image file
        const imageDestination = path.join(__dirname, '../Default_music/Albums');
        const imageTargetPath = path.join(imageDestination, imageFilename);

        // Create read and write streams for image file
        const imageReadStream = fs.createReadStream(imageFile.path);
        const imageWriteStream = fs.createWriteStream(imageTargetPath);

        // Handle errors during file streams
        imageReadStream.on('error', (error) => {
            console.error('Error reading image file:', error);
            cleanupAndRespond(res, imageFile.path, 'Error reading image file.');
        });

        imageWriteStream.on('error', (error) => {
            console.error('Error writing image file:', error);
            cleanupAndRespond(res, imageFile.path, 'Error writing image file.');
        });

        // Pipe the read and write streams for image file
        imageReadStream.pipe(imageWriteStream);

        // Handle finish event for image write stream
        imageWriteStream.on('finish', async () => {
            // After the file is saved, create an album document and save it to the database
            try {
                const album = new Album({
                    name: fields.name[0],
                    description: fields.description[0],
                    imageUrl: path.relative(__dirname, imageTargetPath),
                    imageName: imageFilename,
                    // lists: fields.lists[0].split(','),
                });

                // Asynchronous save album document
                try {
                    const savedAlbum = await album.save();
                    res.status(201).send({
                        data: savedAlbum,
                        message: 'Album uploaded successfully',
                    });
                } catch (saveError) {
                    console.error('Error saving album:', saveError);
                    res.status(500).send({
                        error: 'Error saving album.'
                    });
                }
            } catch (error) {
                console.error('Error uploading album:', error);
                res.status(500).send({
                    error: 'An error occurred while uploading album'
                });
            }

            // Clean up temporary file
            cleanupTempFiles(imageFile.path);
        });
    });
};








function cleanupTempFiles(...tempPaths) {
	for (const tempPath of tempPaths) {
		fs.unlink(tempPath, (error) => {
			if (error) {
				console.error(`Error deleting temp file: ${tempPath}`, error);
			}
		});
	}
}

function cleanupAndRespond(res, musicTempPath, imageTempPath, errorMessage) {
	cleanupTempFiles(musicTempPath, imageTempPath);
	res.status(500).send({
		error: errorMessage
	});
}






















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



exports.deleteMusic = async (req, res) => {
    try {
		// Delete the music document from the MongoDB
        const deletedMusic = await Music.findByIdAndDelete(req.params.musicId);
        // console out deletedMusic info for debugging
		// console.log('deletedMusic:', deletedMusic);

        if (deletedMusic) {
            deleteLocalFiles(deletedMusic.file, deletedMusic.picture);
            res.status(200).send({ message: "Music and relevant files deleted successfully" });
        } else {
            res.status(404).send({ error: "Music is not found" });
        }
    } catch (error) {
        console.error('Error deleting music:', error);
        res.status(500).send({ error: 'Error deleting music.' });
    }
};



exports.renderPage = async (req, res) => {
	const musics = await Music.find()
	res.status(200).send({ data: musics })
}






exports.renderAlbumPage = async (req, res) => {
	const albums = await Album.find()
	res.status(200).send({ data: albums })
}



exports.saveAlbum = (req, res) => {
    const form = new multiparty.Form();

    // Use form.parse method to parse form data: it will parse the form data in the request into fields and files objects.
    // fields contains key-value pairs of form fields, files contains uploaded files.
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).send({
                error: 'Error parsing form data.'
            });
            return;
        }

        // Get the uploaded album cover image
        const imageFile = files.picture[0];
        const imageFilename = fields.name[0] + '.jpg';
        const imageTempPath = imageFile.path;

        // Specify the storage path and filename for the image file
        const imageDestination = path.join(__dirname, '../Default_music/Albums');
        const imageTargetPath = path.join(imageDestination, imageFilename);

        // Move the image file to the storage path
        fs.rename(imageTempPath, imageTargetPath, async (imageError) => {
            if (imageError) {
                console.error('Error moving the image file:', imageError);
                res.status(500).send({
                    error: 'Error moving the image file.'
                });
                return;
            }

            // Create an album document and save it to the database
            try {
                const album = new Album({
                    name: fields.name[0],
                    description: fields.description[0],
					imageUrl: path.relative(__dirname, imageTargetPath),
					imageName: imageFilename,
					// lists: fields.lists[0].split(','),
                });
				// Asynchronous save album document
                try {
                    const savedAlbum = await album.save();
                    res.status(201).send({
                        data: savedAlbum,
                        message: 'Album uploaded successfully',
                    });
                } catch (saveError) {
                    console.error('Error saving album:', saveError);
                    res.status(500).send({
                        error: 'Error saving album.'
                    });
                }
            } catch (error) {
                console.error('Error uploading album:', error);
                res.status(500).send({
                    error: 'An error occurred while uploading album'
                });
            }
        });
    });
};


exports.updateAlbum = async (req, res) => {
	const album = await Album.findByIdAndUpdate(req.params.albumId, req.body, {
		new: true,
	})
	res.send({ data: album, message: "Update successfully" })
}



exports.deleteAlbum = async (req, res) => {
    try {
		// Delete the album document from the MongoDB
        const deletedAlbum = await Album.findByIdAndDelete(req.params.albumId);
        // console out deletedAlbum info for debugging
		// console.log('deletedAlbum:', deletedAlbum);

        if (deletedAlbum) {
            deleteLocalFiles(deletedAlbum.file, deletedAlbum.picture);
            res.status(200).send({ message: "Album and relevant files deleted successfully" });
        } else {
            res.status(404).send({ error: "Album is not found" });
        }
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).send({ error: 'Error deleting album.' });
    }
};




function deleteLocalFiles(...filePaths) {
    for (const filePath of filePaths) {
        try {
            const absPath = path.join(__dirname, filePath);
            fs.unlinkSync(absPath);
            // console.log(`Deleted file: ${absPath}`);
        } catch (error) {
            console.error(`Error deleting file: ${filePath}`, error);
        }
    }
}


