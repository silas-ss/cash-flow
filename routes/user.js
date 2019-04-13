const UserController = require('../controllers/user')
const JWTService = require('../services/jwt')
const ServerContext = require('../services/server-context')

const userRouter = (app, authorizationMiddleware) => {
  const userController = new UserController(app.datasource.models.User, JWTService, ServerContext)

  app.route('/api/v1/users')
    .post(authorizationMiddleware.verifyJWT, (req, res) => {
      userController.register(req.body).then(() => {
        res.sendStatus(203)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })
    .get(authorizationMiddleware.verifyJWT, (req, res) => {
      userController.list().then(result => {
        res.status(200).send(result)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })

  app.route('/api/v1/users/:id')
    .get(authorizationMiddleware.verifyJWT, (req, res) => {
      userController.find(req.params).then(result => {
        if (result !== null) {
          res.status(200).send(result)
        } else {
          res.statusStatus(404)
        }
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })
    .put(authorizationMiddleware.verifyJWT, (req, res) => {
      userController.update(req.body, req.params).then(result => {
        res.status(200).send(result)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })
    .delete(authorizationMiddleware.verifyJWT, (req, res) => {
      userController.delete(req.params).then(result => {
        res.sendStatus(200)
      }).catch(err => {
        res.status(404).send({ msg: "User not found" })
      })
    })
  
  app.route('/api/v1/auth')
    .post((req, res) => {
      userController.auth(req.body).then(result => {
        res.send(result)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })

  app.route('/api/v1/logout')
    .get(authorizationMiddleware.verifyJWT, (req, res) => {
      userController.logout(req.userId)
      res.sendStatus(204)
    })
}

module.exports = userRouter