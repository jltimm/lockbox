const express = require('express')
const router = express.Router()
const userService = require('../services/userservice')

// routes
router.post('/api/authenticate', authenticate)
router.post('/api/register', register)

module.exports = router

/**
 * Registers the user by calling the register method in userService
 * Returns 400 bad request if there is an issue registering
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function register (req, res) {
  userService.register(req.body, function (user) {
    if (user) {
      res.json(user)
    } else {
      res.status(400).json({ message: 'Could not register' })
    }
  })
}

/**
 * Authenticates the user by calling the authenticate method in userService
 * Returns 400 bad request if the username or password is incorrect
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function authenticate (req, res) {
  userService.authenticate(req.body, function (user) {
    if (user) {
      res.json(user)
    } else {
      res.status(400).json({ message: 'Username or password is incorrect' })
    }
  })
}
