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
function getLogins (callback) {
  Login.find({}, 'website username password', (err, logins) => {
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
function getLoginById (id, callback) {
  Login.findById(id, 'website username password', (err, login) => {
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
function updateLogin (id, { website, username, password }, callback) {
  Login.findById(id, 'website username password', (err, login) => {
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
function newLogin ({ website, username, password }, callback) {
  const newLogin = new Login({
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
function deleteLogin (id, callback) {
  Login.deleteOne({
    _id: id
  }, (err) => {
    if (err) {
      callback(err)
    } else {
      callback(null)
    }
  })
}
