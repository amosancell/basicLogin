var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema for holding user info
var userSchema = new Schema({
    userName: String,
    password: String,
    name: String,
    age: Number,
    apples: Array
});

// create schema for holding Dog info
var appleSchema = new Schema({
    type: String,
    color: String
});

// attach schema to model
var User = mongoose.model('User', userSchema);
var Apple = mongoose.model('Apple', appleSchema);

// allow other files in project to access User
module.exports = {};
module.exports.userSchema = User;
module.exports.appleSchema = Apple;