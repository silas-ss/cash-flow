const express = require('express')
const bodyParser = require('body-parser')

const userRouter = require('./routes/user')
const cashInflowRouter = require('./routes/cash-inflow')
const cashOutflowRouter = require('./routes/cash-outflow')

const datasource = require('./config/datasource')

const authorizationMiddleware = require('./middlewares/authorization-middleware')

const app = express()

app.datasource = datasource(app)

app.use(bodyParser.json())

userRouter(app, authorizationMiddleware)
cashInflowRouter(app, authorizationMiddleware)
cashOutflowRouter(app)

module.exports = app