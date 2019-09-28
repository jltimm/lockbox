var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * Schema for the database
 */
var LoginSchema = new Schema({
  userId: String,
  website: String,
  username: String,
  password: String
})

var Login = mongoose.model('Login', LoginSchema)
module.exports = Login
