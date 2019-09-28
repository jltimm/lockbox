const UserIDJWTMapping = require('../models/UserIDJWTMapping')

module.exports = {
  createMapping,
  updateMapping
}

/**
 * Creates a mapping between user id's and JWT tokens
 *
 * @param {string} userId The user ID
 * @param {string} jwtToken The JWT token
 * @param {function} callback The callback
 */
function createMapping (userId, jwtToken, callback) {
  const userIDJWTMapping = new UserIDJWTMapping({ userId, jwtToken })
  userIDJWTMapping.save((err) => {
    if (err) {
      callback(err)
    } else {
      callback(null)
    }
  })
}

/**
 * Updates a mapping between user id's and JWT tokens
 *
 * @param {string} userId The user ID
 * @param {string} jwtToken The JWT token
 * @param {function} callback The callback
 */
function updateMapping (userId, jwtToken, callback) {
  UserIDJWTMapping.findOne({ userId }, (err, mapping) => {
    if (err) {
      callback(err)
    } else {
      mapping.jwtToken = jwtToken
      mapping.save(err => {
        if (err) {
          callback(err)
        } else {
          callback(null)
        }
      })
    }
  })
}
