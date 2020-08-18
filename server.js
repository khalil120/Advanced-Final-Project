const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const { authorized, parseUser, anonymouse } = require('./middlewares/auth');
const fs = require('fs');
const app = express()
const PORT = process.env.PORT || 3000



app.listen(PORT, function() {
    console.log(`Node server is running on port ${PORT}...`);
});

app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(parseUser);
app.use(authRouter);
app.use(express.static(path.resolve(__dirname, 'client', 'public')));


app.get('/', function(req, res) {
    fs.createReadStream('./client/home.html').pipe(res);
});

app.get('/login', anonymouse, function(req, res) {
    fs.createReadStream('./client/login.html').pipe(res);
});