const express = require('express')
const userRouter = express.Router()
const userService = require('../services/userservice')
const mappingService = require('../services/useridjwtmappingservice')

// Routes
userRouter.post('/authenticate', authenticate)
userRouter.post('/register', register)
userRouter.post('/logout', logout)

module.exports = userRouter

/**
 * Registers the user by calling the register method in userService
 * Returns 400 bad request if there is an issue registering
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function register (req, res) {
  userService.register(req.body, user => {
    if (user) {
      req.session.current_user = user.userId
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
  userService.authenticate(req.body, user => {
    if (user) {
      req.session.current_user = user.userId
      res.json(user)
    } else {
      res.status(400).json({ message: 'Username or password is incorrect' })
    }
  })
}

/**
 * Logs a user out by remove the JWT mapping and removing
 * the current_user session attribute
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function logout (req, res) {
  mappingService.removeMapping(req.session.current_user, err => {
    if (err) {
      res.status(400).json({ message: 'Could not logout' })
    } else {
      req.session.current_user = null
      res.send({
        success: true
      })
    }
  })
}
