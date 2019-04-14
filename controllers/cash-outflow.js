module.exports = class CashOutflowController {
  constructor (CashOutflow) {
    this.CashOutflow = CashOutflow
  }

  create (data) {
    return this.CashOutflow.create(data)
      .then(result => result)
      .catch(err => err)
  }

  list () {
    return this.CashOutflow.findAll()
      .then(result => result)
      .catch(err => err)
  }

  find (params) {
    return this.CashOutflow.findOne({ where: params })
      .then(result => result)
      .catch(err => err)
  }

  update (data, params) {
    return this.CashOutflow.update(data, { where: params })
      .then(result => result)
      .catch(err => err)
  }

  delete (params) {
    return this.CashOutflow.destroy({ where: params })
      .then(result => result)
      .catch(err => err)
  }
}