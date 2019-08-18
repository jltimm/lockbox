const jwt = require('jsonwebtoken')
const config = require('../_helpers/config.json')
const User = require('../models/User')

module.exports = {
  authenticate
}

async function authenticate ({ username, password }) {
  User.findOne({ username }, (err, user) => {
    if (err) console.error(err)
    if (user) {
      user.isCorrectPassword(password, (err, same) => {
        if (!err && same) {
          const token = jwt.sign({ sub: user.id }, config.secret)
          const { password, ...userWithoutPassword } = user
          return {
            ...userWithoutPassword,
            token
          }
        }
      })
    }
  })
}
