const express = require('express')
const bodyParser = require('body-parser')

const userController = require('../controllers/user-controller')
const { sequelize } = require('../config/database-config')
const authorizationMiddleware = require('../middlewares/authorization-middleware')

const port = process.env.PORT || 3000

sequelize.sync()
const app = express()

app.use(bodyParser.json())

app.post('/api/v1/users', userController.register)
app.post('/api/v1/auth', userController.auth)
app.get('/api/v1/protected', authorizationMiddleware.verifyJWT, (req, res) => {
  res.send('ok')
})

app.listen(port, () => {
  console.log('API is live')
})