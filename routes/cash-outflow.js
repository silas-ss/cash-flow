const CashOutflowController = require('../controllers/cash-outflow')

const cashOutFlowRouter = (app, authorizationMiddleware) => {
  const cashOutflowController = new CashOutflowController(app.datasource.models.CashOutflow)

  app.route('/api/v1/cash-outflows')
    .post(authorizationMiddleware.verifyJWT, authorizationMiddleware.hasAdminRole, (req, res) => {
      cashOutflowController.create(req.body)
        .then(() => {
          res.sendStatus(201)
        }).catch(err => {
          res.status(500).send({ msg: err.message })
        })
    })
    .get(authorizationMiddleware.verifyJWT, (req, res) => {
      cashOutflowController.list()
        .then(result => {
          res.send(result)
        }).catch(err => {
          res.status(500).send({ msg: err.message })
        })
    })
  
  app.route('/api/v1/cash-outflows/:id')
    .get(authorizationMiddleware.verifyJWT, (req, res) => {
      cashOutflowController.find(req.params)
        .then(result => {
          res.send(result)
        }).catch(err => {
          res.status(500).send({ msg: err.message })
        })
    })
    .put(authorizationMiddleware.verifyJWT, authorizationMiddleware.hasAdminRole, (req, res) => {
      cashOutflowController.update(req.body, req.params)
        .then(result => {
          res.send(result)
        }).catch(err => {
          res.status(500).send({ msg: err.message })
        })
    })
    .delete(authorizationMiddleware.verifyJWT, authorizationMiddleware.hasAdminRole, (req, res) => {
      cashOutflowController.delete(req.params)
        .then(() => {
          res.sendStatus(200)
        }).catch(err => {
          res.status(500).send({ msg: err.message })
        })
    })

}

module.exports = cashOutFlowRouter