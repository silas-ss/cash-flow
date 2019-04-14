const CashInflowController = require('../../../controllers/cash-inflow')

describe('Cash-inflow Controller', () => {
  describe('Create cash-inflow', () => {
    it('should create cash-inflow', () => {
      const CashInflow = {
        create: td.function()
      }

      const newCashInflow = {
        title: 'Manutenção de aplicações',
        description: 'Manutenção de aplicações',
        amount: 5000.00,
        datePaid: '2019-04-12'
      }

      const expectedResponse = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        title: 'Manutenção de aplicações',
        description: 'Manutenção de aplicações',
        amount: 5000.00,
        datePaid: '2019-04-12',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }

      td.when(CashInflow.create(newCashInflow)).thenResolve(expectedResponse)
      const cashInflowController = new CashInflowController(CashInflow)
      cashInflowController.create(newCashInflow)
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Update cash-inflow', () => {
    it('should update cash-inflow', () => {
      const CashInflow = {
        update: td.function()
      }

      const updatedCashInflow = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        title: 'Manutenção de aplicações',
        description: 'Manutenção de aplicações',
        amount: 5000.00,
        datePaid: '2019-04-12'
      }

      const where = { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' }

      td.when(CashInflow.update(updatedCashInflow, { where })).thenResolve([1])

      const cashInflowController = new CashInflowController(CashInflow)
      cashInflowController.update(updatedCashInflow, where)
        .then(response => expect(response).to.be.eql([1]))
    })
  })

  describe('Get all cash-inflow', () => {
    it('should return a list of cash-inflow', () => {
      const CashInflow = {
        findAll: td.function()
      }

      const expectedResponse = [{
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        title: 'Manutenção de aplicações',
        description: 'Manutenção de aplicações',
        amount: 5000.00,
        datePaid: '2019-04-12',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }]

      td.when(CashInflow.findAll()).thenResolve(expectedResponse)

      const cashInflowController = new CashInflowController(CashInflow)
      cashInflowController.list()
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Get a cash-inflow', () => {
    it('should return a cash-inflow', () => {
      const CashInflow = {
        findOne: td.function()
      }

      const expectedResponse = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        title: 'Manutenção de aplicações',
        description: 'Manutenção de aplicações',
        amount: 5000.00,
        datePaid: '2019-04-12',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }

      const where = { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' }
      td.when(CashInflow.findOne({ where })).thenResolve(expectedResponse)

      const cashInflowController = new CashInflowController(CashInflow)
      cashInflowController.find(where)
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Delete a cash-inflow', () => {
    it('should delete a cash-inflow', () => {
      const CashInflow = {
        destroy: td.function()
      }

      const where = { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' }
      td.when(CashInflow.destroy({ where })).thenResolve([1])

      const cashInflowController = new CashInflowController(CashInflow)
      cashInflowController.delete(where)
        .then(response => expect(response).to.be.eql([1]))
    })
  })
})