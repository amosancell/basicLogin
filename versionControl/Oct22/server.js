var userName = "amosancell";
var password = "hello";
var userInfo = {}


var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');


var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

require("./routes/routes.js")(app, cors, userName, password, userInfo);

connectString = "mongodb+srv://amosAncell:goDataBase@cluster0-pckij.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(connectString);

app.listen(3000);
console.log("Listening at localhost:3000");