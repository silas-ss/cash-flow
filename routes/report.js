const ReportController = require('../controllers/report')

const reportRouter = (app, authorizationMiddleware) => {
  const reportController = new ReportController(app.datasource.sequelize)

  app.route('/api/v1/report')
    .get(authorizationMiddleware.verifyJWT, (req, res) => {
      reportController.getData(req.query).then(result => {
        res.send(result)
      }).catch(err => {
        res.status(500).send(err)
      })
    })
}

module.exports = reportRouter