const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const jwt = require('./_helpers/jwt')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('./_helpers/config.json')
const { sessionSecret } = config

/**
 * Basic setup. Starts up express and the database connection
 */
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(session({ secret: sessionSecret }))
app.use(jwt())
mongoose.connect('mongodb://localhost:27017/logins', function () {
  // uncomment below line to drop database
  // mongoose.connection.db.dropDatabase()
})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('Connection Succeeded')
})

app.use('/api', require('./controllers/usercontroller'))
app.use('/api', require('./controllers/loginscontroller'))

app.listen(process.env.PORT || 8081)
