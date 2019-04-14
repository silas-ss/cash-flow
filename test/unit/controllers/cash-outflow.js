const CashOutflowController = require('../../../controllers/cash-outflow')

describe('Cash-outflow Controller', () => {
  describe('Create cash-outflow', () => {
    it('should create cash-outflow', () => {
      const CashOutflow = {
        create: td.function()
      }

      const newCashOutflow = {
        title: 'Conta de Internet',
        description: 'Conta de Internet',
        amount: 300.00,
        dateBilled: '2019-04-12'
      }

      const expectedResponse = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        title: 'Conta de Internet',
        description: 'Conta de Internet',
        amount: 300.00,
        dateBilled: '2019-04-12',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }

      td.when(CashOutflow.create(newCashOutflow)).thenResolve(expectedResponse)
      const cashOutflowController = new CashOutflowController(CashOutflow)
      cashOutflowController.create(newCashOutflow)
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Update cash-outflow', () => {
    it('should update cash-outflow', () => {
      const CashOutflow = {
        update: td.function()
      }

      const updatedCashOutflow = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        title: 'Conta de Internet',
        description: 'Conta de Internet',
        amount: 300.00,
        dateBilled: '2019-04-12'
      }

      const where = { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' }

      td.when(CashOutflow.update(updatedCashOutflow, { where })).thenResolve([1])

      const cashInflowController = new CashOutflowController(CashOutflow)
      cashInflowController.update(updatedCashOutflow, where)
        .then(response => expect(response).to.be.eql([1]))
    })
  })

  describe('Get all cash-outflow', () => {
    it('should return a list of cash-outflow', () => {
      const CashOutflow = {
        findAll: td.function()
      }

      const expectedResponse = [{
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        title: 'Conta de Internet',
        description: 'Conta de Internet',
        amount: 300.00,
        dateBilled: '2019-04-12',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }]

      td.when(CashOutflow.findAll()).thenResolve(expectedResponse)

      const cashInflowController = new CashOutflowController(CashOutflow)
      cashInflowController.list()
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Get a cash-outflow', () => {
    it('should return a cash-outflow', () => {
      const CashOutflow = {
        findOne: td.function()
      }

      const expectedResponse = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        title: 'Conta de Internet',
        description: 'Conta de Internet',
        amount: 300.00,
        dateBilled: '2019-04-12',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }

      const where = { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' }
      td.when(CashOutflow.findOne({ where })).thenResolve(expectedResponse)

      const cashInflowController = new CashOutflowController(CashOutflow)
      cashInflowController.find(where)
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Delete a cash-outflow', () => {
    it('should delete a cash-outflow', () => {
      const CashOutflow = {
        destroy: td.function()
      }

      const where = { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' }
      td.when(CashOutflow.destroy({ where })).thenResolve([1])

      const cashInflowController = new CashOutflowController(CashOutflow)
      cashInflowController.delete(where)
        .then(response => expect(response).to.be.eql([1]))
    })
  })
})