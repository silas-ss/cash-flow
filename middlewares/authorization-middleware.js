const jwt = require('jsonwebtoken')

const authorizationMiddleware = {
  verifyJWT: (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) return res.status(401).send({ msg: 'Unauthorized' })

    if (token.split(' ')[0] !== 'Bearer') return res.status(500).send({ msg: 'Token invalid' })
    
    jwt.verify(token.split(' ')[1], process.env.SECRET, (err, decoded) => {
      if (err) return res.status(500).send({ msg: 'Token invalid' })

      req.userId = decoded.id
      req.userRole = decoded.role
      next()
    })
  }
}

module.exports = authorizationMiddleware