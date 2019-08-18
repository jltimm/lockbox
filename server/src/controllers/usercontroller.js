const express = require('express')
const router = express.Router()
const userService = require('../services/userservice')

// routes
router.post('/api/authenticate', authenticate)

module.exports = router

function authenticate (req, res, next) {
  console.log('Authenticate')
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err))
}
