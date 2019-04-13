const express = require('express')
const httpContext = require('express-http-context')
const bodyParser = require('body-parser')

const userRouter = require('./routes/user')
const cashInflowRouter = require('./routes/cash-inflow')
const cashOutflowRouter = require('./routes/cash-outflow')
const reportRouter = require('./routes/report')

const datasource = require('./config/datasource')

const authorizationMiddleware = require('./middlewares/authorization-middleware')

const CryptService = require('./services/crypt')

const app = express()

app.datasource = datasource(app)

app.use(bodyParser.json())
app.use(httpContext.middleware)

userRouter(app, authorizationMiddleware)
cashInflowRouter(app, authorizationMiddleware)
cashOutflowRouter(app, authorizationMiddleware)
reportRouter(app, authorizationMiddleware)

// Create root user
const User = app.datasource.models.User
const user = {
  id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
  name: 'Root',
  email: 'root@test.com',
  password: CryptService.cipher('root'),
  role: 'ADMIN'
}
User.create(user)

module.exports = app