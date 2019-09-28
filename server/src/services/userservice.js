const jwt = require('jsonwebtoken')
const config = require('../_helpers/config.json')
const User = require('../models/User')
const mappingService = require('./useridjwtmappingservice.js')

module.exports = {
  authenticate,
  register
}

/**
 * Registers the user.
 *
 * Saves the username and password to the database. If there is an issue,
 * then return null to the callback. Otherwise, create a JWT token for the user
 * to authenticate them
 *
 * @param {Object} param0 The email and password from the form
 * @param {function} callback The callback
 */
function register ({ email, password }, callback) {
  const user = new User({ email, password })
  user.save((err) => {
    if (err) {
      callback(null)
    } else {
      const token = jwt.sign({ sub: user.id }, config.secret)
      mappingService.createMapping(user.id, token, err => {
        if (err) {
          callback(null)
        } else {
          const res = { email, token }
          callback(res)
        }
      })
    }
  })
}

/**
 * Authenticates the user.
 *
 * Tries to find the email in the database. If one if found, then
 * compare the passwords to see if they match. If they do, create
 * a JWT token to authenticate the user. Otherwise return null to
 * the callback.
 *
 * @param {Object} param0 The email and password from the form
 * @param {function} callback The callback
 */
function authenticate ({ email, password }, callback) {
  User.findOne({ email }, function (err, user) {
    if (err) console.error(err)
    if (user) {
      user.isCorrectPassword(password, function (err, same) {
        if (!err && same) {
          const token = jwt.sign({ sub: user.id }, config.secret)
          mappingService.updateMapping(user.id, token, err => {
            if (err) {
              callback(null)
            } else {
              const res = { email, token }
              callback(res)
            }
          })
        } else {
          callback(null)
        }
      })
    } else {
      callback(null)
    }
  })
}
