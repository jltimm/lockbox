const mongoose = require('mongoose')

/**
 * Maps user IDs to JWT tokens
 */
const UserIDJWTMappingSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true, unique: true },
  jwtToken: String
})

module.exports = mongoose.model('UserIDJWTMapping', UserIDJWTMappingSchema)
