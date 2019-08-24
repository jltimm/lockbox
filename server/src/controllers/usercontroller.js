const express = require('express')
const router = express.Router()
const userService = require('../services/userservice')

// routes
router.post('/api/authenticate', authenticate)

module.exports = router

function authenticate (req, res, next) {
  userService.authenticate(req.body, function (user) {
    if (user) {
      res.json(user)
    } else {
      res.status(400).json({ message: 'Username or password is incorrect' })
    }
  })
}
