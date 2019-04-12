const { CashInflow } = require('../models/cash-inflow')

const cashInflowController = {
  create: (req, res) => {
    const cashInflow = {
      title: req.body.title,
      description: req.body.description,
      amount: req.body.amount,
      datePaid: req.body.datePaid,
      userId: req.userId
    }
    CashInflow.create(cashInflow).then(() => {
      res.sendStatus(201)
    }).catch(err => {
      res.status(500).send({ msg: err.message })
    })
  },
  list: (req, res) => {
    CashInflow.findAll().then(inflows => {
      res.status(200).send(inflows)
    }).catch(err => {
      res.status(500).send({ msg: err.message })
    })
  },
  find: (req, res) => {
    const id = req.params.id
    CashInflow.findOne({ where: { id } }).then(inflow => {
      if (inflow !== null) {
        res.status(200).send(inflow)
      } else {
        res.status(404).send({ msg: 'Cash-inflow register not found' })
      }
    }).catch(err => {
      res.status(500).send({ msg: err.message })
    })
  },
  update: (req, res) => {
    const id = req.params.id
    CashInflow.findOne({ where: { id } }).then(inflow => {
      if (inflow !== null) {
        inflow.title = req.body.title
        inflow.description = req.body.description
        inflow.amount = req.body.amount
        inflow.datePaid = req.body.datePaid
        inflow.save().then(() => {
          res.status(200).send(inflow)
        }).catch(err => {
          res.status(500).send({ msg: err.message })
        })
      } else {
        res.status(404).send({ msg: 'Cash-inflow register not found' })
      }
    }).catch(err => {
      res.status(500).send({ msg: err.message })
    })
  },
  delete: (req, res) => {
    const id = req.params.id
    CashInflow.destroy({ where: { id } }).then(() => {
      res.sendStatus(200)
    }).catch(err => {
      res.status(500).send({ msg: err.message })
    })
  }
}

module.exports = cashInflowController