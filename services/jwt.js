const jwt = require('jsonwebtoken')

const JWTService = {
  tokenGenerate: (payload, params) => {
    return jwt.sign(payload, process.env.SECRET, params)
  }
}


module.exports = JWTService