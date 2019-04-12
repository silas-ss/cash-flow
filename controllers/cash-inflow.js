module.exports = class CashInflowController {
  constructor (CashInflow) {
    this.CashInflow = CashInflow
  }

  create (data) {
    return this.CashInflow.create(data)
      .then(result => result)
      .catch(err => err)
  }

  list () {
    return this.CashInflow.findAll()
      .then(result => result)
      .catch(err => err)
  }

  find (params) {
    return this.CashInflow.findOne({ where: params })
      .then(result => result)
      .catch(err => err)
  }

  update (data, params) {
    return this.CashInflow.update(data, { where: params })
      .then(result => result)
      .then(err => err)
  }

  delete (params) {
    return this.CashInflow.destroy({ where: params })
      .then(result => result)
      .catch(err => err)
  }
}
