const jwt = require('jsonwebtoken')
const config = require('../_helpers/config.json')
const User = require('../models/User')

module.exports = {
  authenticate
}

function authenticate ({ email, password }, callback) {
  User.findOne({ email }, function (err, user) {
    if (err) console.error(err)
    if (user) {
      user.isCorrectPassword(password, function (err, same) {
        if (!err && same) {
          const token = jwt.sign({ sub: user.id }, config.secret)
          const res = { email, token }
          callback(res)
        }
      })
    }
  })
}
