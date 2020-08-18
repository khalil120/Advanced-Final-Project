const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const fs = require('fs');
const authRouter = require('./routes/auth');

const { parseUser, anonymouse } = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Node server is running on port ${PORT}...`);
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(parseUser);
app.use(authRouter);
app.use(express.static(path.resolve(__dirname, 'client', 'public')));

app.get('/', (req, res) => {
	fs.createReadStream('./client/home.html').pipe(res);
});

app.get('/login', anonymouse, (req, res) => {
	fs.createReadStream('./client/login.html').pipe(res);
});
