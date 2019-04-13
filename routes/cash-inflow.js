const CashInflowController = require('../controllers/cash-inflow')

const cashInflowRouter = (app, authorizationMiddleware) => {
  const cashInflowController = new CashInflowController(app.datasource.models.CashInflow)

  app.route('/api/v1/cash-inflows')
    .post(authorizationMiddleware.verifyJWT, (req, res) => {
      cashInflowController.create(req.body).then(() => {
        res.sendStatus(201)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })
    .get(authorizationMiddleware.verifyJWT, (req, res) => {
      cashInflowController.list().then(result => {
        res.status(200).send(result)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })

  app.route('/api/v1/cash-inflows/:id')
    .get(authorizationMiddleware.verifyJWT, (req, res) => {
      cashInflowController.find(req.params).then(result => {
        if (result !== null) {
          res.status(200).send(result)
        } else {
          res.status(404).send({ msg: 'Cash-inflow register not found' })
        }
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    }) 
    .put(authorizationMiddleware.verifyJWT, (req, res) => {
      cashInflowController.update(req.body, req.params).then(result => {
        res.status(200).send(result)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })
    .delete(authorizationMiddleware.verifyJWT, (req, res) => {
      cashInflowController.delete(req.params).then(() => {
        res.sendStatus(200)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })
}

module.exports = cashInflowRouter