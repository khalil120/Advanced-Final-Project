const express = require('express');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const fs = require('fs');

const routerUpload = express.Router();
const dbName = 'heroku_342hvvg9'; // Database Name
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL
const dataurl = `${url}/heroku_342hvvg9`;
// create or use an existing mongodb-native db instance.
// for this example we'll just create one:

// make sure the db instance is open before passing into `Grid`

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	assert.equal(null, err);
	const db = client.db(dbName);
	const bucket = new mongodb.GridFSBucket(db, {
		bucketName: 'img',
	});
	const storage = new GridFsStorage({
		url: dataurl, // mongodb Connection URL
		file: (req, file) => new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				// check type of upload if rent or sale
				const { typeUpload } = req.body;
				let bucket = 'imgRent';

				if (typeUpload === 'sale') {
					bucket = 'imgSale';
				}
				const fileInfo = {
					filename,
					bucketName: bucket,
				};
				resolve(fileInfo);
			});
		}),
	});
	const upload = multer({ storage });

	routerUpload.post('/upload-car-for-sale', upload.single('img'), (req, res) => {
		console.log(req.file);
		const collection = db.collection('carSale');

		const {
			username, mileage, engineType, gearBox, color, year, price, model,
		} = req.body;
		const data = {
			username,
			mileage,
			engineType,
			gearBox,
			color,
			year,
			price,
			model,
			filename: req.file.filename,
			bucketName: req.file.bucketName,
		};
		collection.insertOne(data);
		console.log(data);
		res.redirect('/home');
	});
	routerUpload.post('/upload-car-for-rent', upload.single('img'), (req, res) => {
		console.log(req.file);
		const collection = db.collection('carRent');
		const {
			username, engineType, gearBox, color, year, price, model, time,
		} = req.body;
		const data = {
			username,
			engineType,
			gearBox,
			color,
			year,
			price,
			model,
			time,
			filename: req.file.filename,
			bucketName: req.file.bucketName,
		};
		collection.insertOne(data);
		console.log(data);
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
