const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const methodOverride = require('method-override');
const authRouter = require('./routes/auth');
const routerupload = require('./routes/upload');

const { parseUser, anonymouse } = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client', 'public')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(parseUser);
app.use(authRouter);
app.use(routerupload);
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	fs.createReadStream('./client/home.html').pipe(res);
});

app.get('/home', (req, res) => {
	fs.createReadStream('./client/home.html').pipe(res);
});
app.get('/login', anonymouse, (req, res) => {
	fs.createReadStream('./client/login.html').pipe(res);
});
app.get('/register', anonymouse, (req, res) => {
	fs.createReadStream('./client/reg.html').pipe(res);
});
app.get('/upload', (req, res) => {
	fs.createReadStream('./client/uploadimg.html').pipe(res);
});
app.listen(PORT, () => {
	console.log(`Node server is running on port ${PORT}...`);
});
