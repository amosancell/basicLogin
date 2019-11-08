var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema for holding Apple info
var appleSchema = new Schema({
    type: String,
    color: String
});

// attach schema to model
var Apple = mongoose.model('Apple', appleSchema);

module.exports = {model: Apple, schema: appleSchema};