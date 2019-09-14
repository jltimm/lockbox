const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Login = require('./models/login')
const jwt = require('./_helpers/jwt')
const cookieParser = require('cookie-parser')

/**
 * Basic setup. Starts up express and the database connection
 */
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(jwt())
mongoose.connect('mongodb://localhost:27017/logins')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', callback => {
  console.log('Connection Succeeded')
})

app.use('/', require('./controllers/usercontroller'))

/**
 * GET endpoint, retrieves all logins
 */
app.get('/api/logins', (req, res) => {
  Login.find({}, 'website username password', (error, logins) => {
    if (error) console.error(error)
    res.send({
      logins
    })
  }).sort({ _id: -1 })
})

/**
 * GET endpoint, retrieves a specific login
 */
app.get('/api/login/:id', (req, res) => {
  Login.findById(req.params.id, 'website username password', (error, login) => {
    if (error) console.error(error)
    res.send(login)
  })
})

/**
 * PUT endpoint, updates the given login
 */
app.put('/api/login/:id', (req, res) => {
  Login.findById(req.params.id, 'website username password', (error, login) => {
    if (error) console.error(error)
    login.website = req.body.website
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

/**
 * POST endpoint, creates a new login
 */
app.post('/api/login', (req, res) => {
  var website = req.body.website
  var username = req.body.username
  var password = req.body.password
  var newLogin = new Login({
    website,
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

/**
 * DELETE endpoint, removes the given login
 */
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
