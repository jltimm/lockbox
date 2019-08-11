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
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', callback => {
  console.log('Connection Succeeded')
})

app.get('/api/logins', (req, res) => {
  Login.find({}, 'username password', (error, logins) => {
    if (error) console.error(error)
    res.send({
      logins
    })
  }).sort({ _id: -1 })
})

app.get('/api/login/:id', (req, res) => {
  Login.findById(req.params.id, 'username password', (error, login) => {
    if (error) console.error(error)
    res.send(login)
  })
})

app.put('/api/login/:id', (req, res) => {
  Login.findById(req.params.id, 'username password', (error, login) => {
    if (error) console.error(error)
    login.username = req.body.username
    login.password = req.body.password
    login.save(error => {
      if (error) console.error(error)
      res.send({
        success: true
      })
    })
  })
})

app.post('/api/login', (req, res) => {
  var username = req.body.username
  var password = req.body.password
  var newLogin = new Login({
    username,
    password
  })
  newLogin.save(error => {
    if (error) console.error(error)
    res.send({
      success: true,
      message: 'Login saved successfully!'
    })
  })
})

app.delete('/api/login/:id', (req, res) => {
  Login.remove({
    _id: req.params.id
  }, (err, login) => {
    if (err) res.send(err)
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8081)
