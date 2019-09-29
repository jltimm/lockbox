const Login = require('../models/Login')

module.exports = {
  getLogins,
  getLoginById,
  updateLogin,
  newLogin,
  deleteLogin
}

/**
 * Retrieves all logins
 *
 * @param {function} callback The callback
 */
function getLogins (userId, callback) {
  Login.find({ userId }, (err, logins) => {
    if (err) {
      callback(null)
    } else {
      callback(logins)
    }
  })
}

/**
 * Retrieves a specific login by its ID
 *
 * @param {string} id The ID of the login to retrieve
 * @param {function} callback The callback
 */
function getLoginById (userId, id, callback) {
  Login.findOne({
    _id: id,
    userId
  }, (err, login) => {
    if (err) {
      callback(null)
    } else {
      callback(login)
    }
  })
}

/**
 * Updates a given login
 *
 * @param {string} id The ID of the login to update
 * @param {JSON} param1 The website, username, and password from the body
 * @param {function} callback The callback
 */
function updateLogin (userId, id, { website, username, password }, callback) {
  Login.findOne({
    _id: id,
    userId
  }, (err, login) => {
    if (err) {
      callback(err)
    }
    login.website = website
    login.username = username
    login.password = password
    login.save(saveErr => {
      if (saveErr) {
        callback(saveErr)
      } else {
        callback(null)
      }
    })
  })
}

/**
 * Creates a new login
 *
 * @param {JSON} param0 The website, username, and password from the body
 * @param {function} callback The callback
 */
function newLogin (userId, { website, username, password }, callback) {
  const newLogin = new Login({
    userId,
    website,
    username,
    password
  })
  newLogin.save(err => {
    if (err) {
      callback(err)
    } else {
      callback(null)
    }
  })
}

/**
 * Deletes the given login
 *
 * @param {string} id The ID of the login to delete
 * @param {function} callback The callback
 */
function deleteLogin (userId, id, callback) {
  Login.deleteOne({
    _id: id,
    userId
  }, (err) => {
    if (err) {
      callback(err)
    } else {
      callback(null)
    }
  })
}
