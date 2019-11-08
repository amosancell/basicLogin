var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appleSchema = require('./apple.js').schema;

// create schema for holding user info
var userSchema = new Schema({
    userName: String,
    password: String,
    name: String,
    age: Number,
    apples: [appleSchema]
});

// attach schema to model
var User = mongoose.model('User', userSchema);

// allow other files in project to access User
//module.exports = {};
//module.exports.userSchema = User;
//module.exports.appleSchema = Apple;
module.exports = User;