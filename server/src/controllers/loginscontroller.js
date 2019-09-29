const express = require('express')
const loginsRouter = express.Router()
const loginsService = require('../services/loginsservice')

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
  loginsService.getLogins(req.session.current_user, logins => {
    res.send({
      logins
    })
  })
}

/**
 * Retrieves a specific login by its ID
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function getLoginById (req, res) {
  loginsService.getLoginById(req.session.current_user, req.params.id, login => {
    res.send(login)
  })
}

/**
 * Updates a given login
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function updateLogin (req, res) {
  loginsService.updateLogin(req.session.current_user, req.params.id, req.body, err => {
    if (err) console.log(err)
    res.send({
      success: true
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
  loginsService.newLogin(req.session.current_user, req.body, err => {
    if (err) console.log(err)
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
  loginsService.deleteLogin(req.session.current_user, req.params.id, err => {
    if (err) {
      res.send(err)
    } else {
      res.send({
        success: true
      })
    }
  })
}
