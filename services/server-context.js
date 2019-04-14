const httpContext = require('express-http-context')

const serverContext = {
  hasTokenActive: (userId) => {
    const token = httpContext.get(userId)
    if (token) {
      return token
    }
    return null
  },
  setToken: (userId, token) => {
    httpContext.set(userId, token)
  }
}

module.exports = serverContext