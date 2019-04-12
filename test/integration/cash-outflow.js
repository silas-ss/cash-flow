describe('Routes /cash-outflows', () => {
  const CashOutflow = app.datasource.models.CashOutflow

  const defaultCashOutflow = {
    id: 'ba5ba00f-9d99-4cb7-91ab-b63255d6144e',
    title: 'Salário Funcionários',
    description: 'Salário Funcionários',
    amount: '20000.00',
    dateBilled: '2019-04-12'
  }

  beforeEach(done => {
    CashOutflow.destroy({ where: {} })
      .then(() => CashOutflow.create(defaultCashOutflow))
      .then(() => {
        done()
      })
  })

  describe('Route POST /cash-outflows', () => {
    const newCashOutflow = {
      title: 'Conta de Internet',
      description: 'Conta de Internet',
      amount: '1000.00',
      dateBilled: '2019-04-12'
    }
    it ('should create a cash-outflow', done => {
      request.post('/api/v1/cash-outflows')
        .send(newCashOutflow)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(201)

          done(err)
        })
    })
  })

  describe('Route GET /cash-outflows', () => {
    it ('should return a list of cash-outflow', done => {
      request.get('/api/v1/cash-outflows')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultCashOutflow.id)
          expect(res.body[0].title).to.be.eql(defaultCashOutflow.title)
          expect(res.body[0].description).to.be.eql(defaultCashOutflow.description)
          expect(res.body[0].amount).to.be.eql(defaultCashOutflow.amount)
          expect(res.body[0].dateBilled).to.be.eql(defaultCashOutflow.dateBilled)

          done(err)
        })
    })
  })

  describe('Route GET /cash-outflows/:id', () => {
    it ('should return a cash-outflow', done => {
      request.get(`/api/v1/cash-outflows/${defaultCashOutflow.id}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultCashOutflow.id)
          expect(res.body.title).to.be.eql(defaultCashOutflow.title)
          expect(res.body.description).to.be.eql(defaultCashOutflow.description)
          expect(res.body.amount).to.be.eql(defaultCashOutflow.amount)
          expect(res.body.dateBilled).to.be.eql(defaultCashOutflow.dateBilled)

          done(err)
        })
    })
  })

  describe('Route PUT /cash-outflows/:id', () => {
    const updatedCashOutflow = {
      id: 'ba5ba00f-9d99-4cb7-91ab-b63255d6144e',
      title: 'Salário Funcionários - Janeiro - 2019',
      description: 'Salário Funcionários - Janeiro - 2019',
      amount: '20000.00',
      dateBilled: '2019-04-12'
    }

    it ('should update a cash-outflow', done => {
      request.put(`/api/v1/cash-outflows/${defaultCashOutflow.id}`)
        .send(updatedCashOutflow)
        .end((err, res) => {
          expect(res.body).to.be.eql([1])

          done(err)
        })
    })
  })

  describe('Route DELETE /cash-outflows/:id', () => {
    it ('should delete a cash-outflow', done => {
      request.delete(`/api/v1/cash-outflows/${defaultCashOutflow.id}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(200)

          done(err)
        })
    })
  })
})