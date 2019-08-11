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

mongoose.connect('mongodb://localhost:27017/logins')
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
})

app.get('/logins', (req, res) => {
  Login.find({}, 'username password', function (error, logins) {
    if (error) { console.error(error); }
    res.send({
      logins
    })
  }).sort({_id:-1})
})

app.get('/login/:id', (req, res) => {
  Login.findById(req.params.id, 'username password', function (error, login) {
    if (error) {
      console.error(error);
    }
    res.send(login);
  })
});

app.put('/login/:id', (req, res) => {
  Login.findById(req.params.id, 'username password', function (error, login) {
    if (error) {
      console.log(error);
    }
    login.username = req.body.username;
    login.password = req.body.password;
    login.save(function (error) {
      if (error) {
        console.log(error);
      }
      res.send({
        success: true
      });
    });
  });
});

app.post('/login', (req, res) => {
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

app.delete('/login/:id', (req, res) => {
  Login.remove({
    _id: req.params.id
  }, (err, login) => {
    if (err) res.send(err)
    res.send({
      success: true
    })
  })
});

app.listen(process.env.PORT || 8081)