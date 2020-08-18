const express = require('express');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const router = express.Router();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL

// const dbName = ''; // Database Name
const dbName2 = 'final-project';

const JWT_SECRET = "black life's matter XD";
const COOKIE_NAME = 'jwt-access-token';

function addUser(res, username, password, email) {
	MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
		assert.equal(null, err);
		const db = client.db(dbName2);
		const collection = db.collection('users');

		collection.findOne({ username }, (err, user) => {
			if (err) {
				console.log('error in finding doc:', err);
				client.close();
				res.sendStatus(400);
			}
			if (user) { // user name exists
				return res.sendStatus(400);
			} // add new user to database
			const newUser = {
				username,
				password,
				email,
				joined: new Date().toISOString(),
			};
			collection.insertOne(newUser);

			// create a jwt token for the user
			const payload = { username: newUser.username, joined: newUser.joined };
			const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

			// set cookie for the client with the jwt
			res.cookie(COOKIE_NAME, accessToken, { httpOnly: true });
			return res.redirect('/');
		});
	});
}

function checkUserName(res, username, password) {
	MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
		assert.equal(null, err);
		const db = client.db(dbName2);
		const collection = db.collection('users');
		// what to do with email ?
		collection.findOne({ username }, (err, user) => {
			if (err) {
				console.log('error in finding doc:', err);
				client.close();
				res.sendStatus(400);
			}
			if (user) {
				if (user.password === password) {
					// create a jwt token for the user
					const payload = { username: user.username, joined: user.joined };
					const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
					// set cookie for the client with the jwt
					res.cookie(COOKIE_NAME, accessToken, { httpOnly: true });
					client.close();
					res.redirect('/');
				} else { // wrong password
					client.close();
					res.sendStatus(400);
				}
			} else { // user not found
				client.close();
				res.sendStatus(400);
			}
		});
	});
}

router.post('/login', (req, res) => {
	if (!req.body) { // make sure request body exist
		return res.sendStatus(400);
	}
	const { username, password } = req.body;
	checkUserName(res, username, password);
});
router.post('/register', (req, res) => {
	// make sure request body exist
	if (!req.body) {
		return res.sendStatus(400);
	}
	const { username, password, email } = req.body;
	console.log(username, password);
	addUser(res, username, password, email);
});

module.exports = router;