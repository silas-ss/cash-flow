const CryptService = require('../../services/crypt')

describe('Routes Report', () => {
  const CashInflow = app.datasource.models.CashInflow
  const CashOutflow = app.datasource.models.CashOutflow
  const User = app.datasource.models.User

  const user = {
    id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
    name: 'User',
    email: 'user@test.com',
    password: CryptService.cipher('userpassword'),
    role: 'ADMIN'
  }

  var token = null

  const cashInflow1 = {
    id: '44f257c8-6256-4ca3-a886-403954b62537',
    title: 'Curso Udemy',
    description: 'Curso Udemy',
    amount: '50000.00',
    datePaid: '2019-04-12'
  }

  const cashInflow2 = {
    id: 'ed011b5a-aaed-421b-9ccb-b1ef688a8fd2',
    title: 'Curso Udemy',
    description: 'Curso Udemy',
    amount: '20000.00',
    datePaid: '2019-03-05'
  }

  const cashOutflow1 = {
    id: 'ba5ba00f-9d99-4cb7-91ab-b63255d6144e',
    title: 'Salário Funcionários',
    description: 'Salário Funcionários',
    amount: '20000.00',
    dateBilled: '2019-04-12'
  }

  const cashOutflow2 = {
    id: '9f7cc845-5f84-4799-94f2-fbda52178ad5',
    title: 'Salário Funcionários',
    description: 'Salário Funcionários',
    amount: '20000.00',
    dateBilled: '2019-03-07'
  }

  beforeEach(done => {
    CashInflow
      .destroy({ where: {} })
      .then(() => CashInflow.create(cashInflow1))
      .then(() => CashInflow.create(cashInflow2))
      .then(() => {
        done()
      })
  })

  beforeEach(done => {
    CashOutflow
      .destroy({ where: {} })
      .then(() => CashOutflow.create(cashOutflow1))
      .then(() => CashOutflow.create(cashOutflow2))
      .then(() => {
        done()
      })
  })

  // Auth and get token
  beforeEach(done => {
    User.destroy({ where: {} })
      .then(() => User.create(user))
      .then(() => {
        request
          .post('/api/v1/auth')
          .send({ email: user.email, password: 'userpassword' })
          .end((err, res) => {
            token = res.body.token
            done()
          })
      })
  })

  describe('Route GET /report', () => {
    const report = {
      cashInflowAmount: '70000.00',
      cashOutflowAmount: '40000.00'
    }

    it('should return report without range date', done => {
      request.get('/api/v1/report')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.cashInflowAmount).to.be.eql(report.cashInflowAmount)
          expect(res.body.cashOutflowAmount).to.be.eql(report.cashOutflowAmount)

          done(err)
        })
    })
  })

  describe('Route GET /report?from=&to=', () => {
    const report = {
      cashInflowAmount: '20000.00',
      cashOutflowAmount: '20000.00'
    }

    it('should return report with range date', done => {
      request.get('/api/v1/report?from=2019-03-01&to=2019-03-31')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.cashInflowAmount).to.be.eql(report.cashInflowAmount)
          expect(res.body.cashOutflowAmount).to.be.eql(report.cashOutflowAmount)

          done(err)
        })
    })
  })
})