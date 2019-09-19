const express = require('express')
const loginsRouter = express.Router()
const Login = require('../models/Login')

// Routes
loginsRouter.get('/logins', getLogins)
loginsRouter.get('/login/:id', getLoginById)
loginsRouter.put('/login/:id', updateLogin)
loginsRouter.post('/login', newLogin)
loginsRouter.delete('/login/:id', deleteLogin)

module.exports = loginsRouter

/**
 * Retrieves all logins.
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function getLogins (req, res) {
  Login.find({}, 'website username password', (error, logins) => {
    if (error) console.error(error)
    res.send({
      logins
    })
  }).sort({ _id: -1 })
}

/**
 * Retrieves a specific login by its ID
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function getLoginById (req, res) {
  Login.findById(req.params.id, 'website username password', (error, login) => {
    if (error) console.error(error)
    res.send(login)
  })
}

/**
 * Updates a given login
 *
 * @param {JSON} req The request
 * @param {*} res The response
 */
function updateLogin (req, res) {
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
}

/**
 * Creates a new login
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */

function newLogin (req, res) {
  const website = req.body.website
  const username = req.body.username
  const password = req.body.password
  const newLogin = new Login({
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
}

/**
 * Deletes the given login
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function deleteLogin (req, res) {
  Login.remove({
    _id: req.params.id
  }, (err, login) => {
    if (err) res.send(err)
    res.send({
      success: true
    })
  })
}
