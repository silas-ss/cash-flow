describe('Routes CashInflows', () => {
  const CashInflow = app.datasource.models.CashInflow

  const defaultCashInflow = {
    id: '44f257c8-6256-4ca3-a886-403954b62537',
    title: 'Curso Udemy',
    description: 'Curso Udemy',
    amount: '5000.00',
    datePaid: '2019-04-12'
  }

  beforeEach(done => {
    CashInflow.destroy({ where: {} })
      .then(() => CashInflow.create(defaultCashInflow))
      .then(() => {
        done()
      })
  })

  describe('Route POST /cash-inflows', () => {
    const newCashInflow = {
      title: 'Curso Pluralsight',
      description: 'Curso Pluralsight',
      amount: 4000.00,
      datePaid: '2019-04-12'
    }
    it('should create a chash-inflow', done => {
      request.post('/api/v1/cash-inflows')
        .send(newCashInflow)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(201)

          done(err)
        })
    })
  })

  describe('Route GET /cash-inflows', () => {
    it('should return a list of chash-inflow', done => {
      request.get('/api/v1/cash-inflows')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultCashInflow.id)
          expect(res.body[0].title).to.be.eql(defaultCashInflow.title)
          expect(res.body[0].description).to.be.eql(defaultCashInflow.description)
          expect(res.body[0].amount).to.be.eql(defaultCashInflow.amount)
          expect(res.body[0].datePaid).to.be.eql(defaultCashInflow.datePaid)

          done(err)
        })
    })
  })

  describe('Route GET /cash-inflows/:id', () => {
    it('should return a chash-inflow', done => {
      request.get(`/api/v1/cash-inflows/${defaultCashInflow.id}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultCashInflow.id)
          expect(res.body.title).to.be.eql(defaultCashInflow.title)
          expect(res.body.description).to.be.eql(defaultCashInflow.description)
          expect(res.body.amount).to.be.eql(defaultCashInflow.amount)
          expect(res.body.datePaid).to.be.eql(defaultCashInflow.datePaid)

          done(err)
        })
    })
  })

  describe('Route UPDATE /cash-inflows/:id', () => {
    const updatedCashInflow = {
      id: '44f257c8-6256-4ca3-a886-403954b62537',
      title: 'Curso Udemy - 2019',
      description: 'Curso Udemy - 2019',
      amount: '5000.00',
      datePaid: '2019-04-12'
    }
    it('should update a chash-inflow', done => {
      request.put('/api/v1/cash-inflows/44f257c8-6256-4ca3-a886-403954b62537')
        .send(updatedCashInflow)
        .end((err, res) => {
          expect(res.body).to.be.eql([1])

          done(err)
        })
    })
  })

  describe('Route DELETE /cash-inflows/:id', () => {
    it('should update a chash-inflow', done => {
      request.delete(`/api/v1/cash-inflows/${defaultCashInflow.id}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(200)

          done(err)
        })
    })
  })
})