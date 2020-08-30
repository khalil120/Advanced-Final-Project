const express = require('express');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const mongodb = require('mongodb');

const { MongoClient } = mongodb;
const assert = require('assert');
const fs = require('fs');

const routerUpload = express.Router();
const dbName = 'heroku_342hvvg9'; // Database Name
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL

// create or use an existing mongodb-native db instance.
// for this example we'll just create one:

// make sure the db instance is open before passing into `Grid`

MongoClient.connect(`${url}/heroku_342hvvg9`, { useUnifiedTopology: true }, (err, client) => {
	assert.equal(null, err);
	const db = client.db(dbName);

	const bucket = new mongodb.GridFSBucket(db, {
		bucketName: 'img',
	});

	const storage = new GridFsStorage({
		url: process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`, // mongodb Connection URL
		file: (req, file) => new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				console.log('hello', url, filename);
				const fileInfo = {
					filename,
					bucketName: 'img',
				};
				resolve(fileInfo);
			});
		}),
	});
	const upload = multer({ storage });

	routerUpload.post('/upload', upload.single('img'), (req, res) => {
		console.log(req.file);

		res.redirect('/home');
	});
	routerUpload.get('/image', (req, res) => {
		// add file name in get request
		bucket.openDownloadStreamByName('image name after uploaded here-----------').pipe(
			fs.createWriteStream('./client/public/img/ image name here ------------------'),
		).on('error',
			(error) => {
				console.log('Error:-', error);
			}).on('finish', () => {
			console.log('done!');
		});
		res.status(200).redirect('/home');
	});
});
module.exports = routerUpload;
