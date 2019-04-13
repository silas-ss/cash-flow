const express = require('express')
const httpContext = require('express-http-context')
const bodyParser = require('body-parser')

const userRouter = require('./routes/user')
const cashInflowRouter = require('./routes/cash-inflow')
const cashOutflowRouter = require('./routes/cash-outflow')
const reportRouter = require('./routes/report')

const datasource = require('./config/datasource')

const authorizationMiddleware = require('./middlewares/authorization-middleware')

const app = express()

app.datasource = datasource(app)

app.use(bodyParser.json())
app.use(httpContext.middleware)

userRouter(app, authorizationMiddleware)
cashInflowRouter(app, authorizationMiddleware)
cashOutflowRouter(app, authorizationMiddleware)
reportRouter(app, authorizationMiddleware)

module.exports = app