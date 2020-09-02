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
		bucketName: 'imgRent',
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
				const fileInfo = {
					filename,
					bucketName: 'imgRent',
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
			username, mileage, engineType, gearBox, color, year, price, model, bags, seats,
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
			bags,
			seats,
			filename: req.file.filename,
			bucketName: req.file.bucketName,
		};
		collection.insertOne(data);
		console.log(data);
		res.redirect('/');
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
		res.redirect('/');
	});
	routerUpload.post('/show-buy', (req, res) => {
		// add file name in get request
		const { carType } = req.body;
		const collection = db.collection('carSale');
		if (carType.length > 0) {
			collection.find({ model: carType }).toArray((err, docs) => {
				assert.equal(err, null);

				const array = [];
				const imageNmae = [];
				docs.forEach((element) => {
					array.push(element);
					imageNmae.push(element.filename);
				});
				imageNmae.forEach((fileName) => {
					/*
					bucket.openDownloadStreamByName(fileName).pipe(
						fs.createWriteStream(`./client/public/img/${fileName}`),
					).on('error',
						(error) => {
							console.log('Error:-', error);
							res.sendStatus(404);
						}).on('finish', () => {
						console.log(`${fileName} download complete!`);
					}); */
					console.log('hellooo');
					res.pipe(bucket.openDownloadStreamByName(fileName));
				});

				res.status(200).send(array);
			});
		} else {
			collection.find({}).toArray((err, docs) => {
				assert.equal(err, null);

				const array = [];
				const imageNmae = [];
				docs.forEach((element) => {
					array.push(element);
					imageNmae.push(element.filename);
				});

				imageNmae.forEach((fileName) => {
					bucket.openDownloadStreamByName(fileName).pipe(
						fs.createWriteStream(`./client/public/img/${fileName}`),
					).on('error',
						(error) => {
							console.log('Error:-', error);
							res.sendStatus(404);
						}).on('finish', () => {
						res.download(`./client/public/img/${fileName}`);
					/*	res.writeHead(200, {
							'Content-Type': 'application/octet-stream',
							'Content-Disposition': `attachment; filename=${fileName}`,
						});
						fs.createReadStream(`./client/public/img/${fileName}`).pipe(res); */
					});
				});
				res.status(200).send(array);
			});
		}
	});
});
module.exports = routerUpload;
