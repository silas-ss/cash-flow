const express = require('express')
const bodyParser = require('body-parser')

const userController = require('./controllers/user-controller')
const cashInflowController = require('./controllers/cash-inflow-controller')

const { sequelize } = require('./config/database-config')
const authorizationMiddleware = require('./middlewares/authorization-middleware')

sequelize.sync()
const app = express()

app.use(bodyParser.json())

app.post('/api/v1/users', userController.register)
app.post('/api/v1/auth', userController.auth)
app.get('/api/v1/users', authorizationMiddleware.verifyJWT, userController.list)
app.get('/api/v1/users/:id', authorizationMiddleware.verifyJWT, userController.find)
app.put('/api/v1/users/:id', authorizationMiddleware.verifyJWT, userController.update)
app.delete('/api/v1/users/:id', authorizationMiddleware.verifyJWT, userController.delete)

app.post('/api/v1/cash-inflows', authorizationMiddleware.verifyJWT, cashInflowController.create)
app.get('/api/v1/cash-inflows', authorizationMiddleware.verifyJWT, cashInflowController.list)
app.get('/api/v1/cash-inflows/:id', authorizationMiddleware.verifyJWT, cashInflowController.find)
app.put('/api/v1/cash-inflows/:id', authorizationMiddleware.verifyJWT, cashInflowController.update)
app.delete('/api/v1/cash-inflows/:id', authorizationMiddleware.verifyJWT, cashInflowController.delete)

module.exports = app