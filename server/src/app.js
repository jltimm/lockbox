const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var mongoose = require('mongoose')
var Login = require('./models/login')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/posts')
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
})

app.get('/passwords', (req, res) => {
  Login.find({}, 'username password', function (error, logins) {
    if (error) { console.error(error); }
    res.send({
      logins
    })
  }).sort({_id:-1})
})

app.post('/passwords', (req, res) => {
  var db = req.db;
  var username = req.body.username;
  var password = req.body.password;
  var new_login = new Login({
    username,
    password
  })

  new_login.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Login saved successfully!'
    })
  })
})

app.listen(process.env.PORT || 8081)