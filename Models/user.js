var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema for holding user info
var userSchema = new Schema({
    userName: String,
    password: String,
    name: String,
    age: Number
});

// attach schema to model
var User = mongoose.model('User', userSchema);

// allow other files in project to access User
module.exports = User;