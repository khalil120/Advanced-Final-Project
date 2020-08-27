const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const authRouter = require('./routes/auth');

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

app.get('/contact-us', anonymouse, (req, res) => {
    fs.createReadStream('./client/contact-us.html').pipe(res);
});

app.get('/post-car', anonymouse, (req, res) => {
    fs.createReadStream('./client/post.html').pipe(res);
});

app.listen(PORT, () => {
    console.log(`Node server is running on port ${PORT}...`);
});