var mongoose = require("mongoose")
var Schema = mongoose.Schema

var LoginSchema = new Schema({
  username: String,
  password: String
})

var Login = mongoose.model("Login", LoginSchema)
module.exports = Login