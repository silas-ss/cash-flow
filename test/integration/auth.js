const serverContext = require('../../services/server-context')
const CryptService = require('../../services/crypt')

describe('Authentication testing', () => {
  const User = app.datasource.models.User

  const user = {
    id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
    name: 'User',
    email: 'user@test.com',
    password: CryptService.cipher('userpassword'),
    role: 'ADMIN'
  }

  beforeEach(done => {
    User.destroy({ where: {} })
      .then(() => User.create(user))
      .then(() => {
        done()
      })
  })

  describe('Route /auth', () => {
    it('should return a token', done => {
      const authData = {
        email: user.email,
        password: 'userpassword'
      }
      request
        .post('/api/v1/auth')
        .send(authData)
        .end((err, res) => {
          expect(res.body.token).to.not.be.empty

          done(err)
        })
    })
  })

  describe('Route /auth with same token', () => {
    it('should return the same token', done => {
      const authData = {
        email: user.email,
        password: 'userpassword'
      }
      let token = null
      request
        .post('/api/v1/auth')
        .send(authData)
        .end((err, res) => {
          token = res.body.token

          request
            .post('/api/v1/auth')
            .send(authData)
            .end((err2, res2) => {
              expect(res2.body.token).to.be.eql(token)

              done(err2)
            })
        })
    })
  })

  describe('Route /logout', () => {
    it('should remove token', done => {
      const authData = {
        email: user.email,
        password: 'userpassword'
      }
      
      request
        .post('/api/v1/auth')
        .send(authData)
        .end((err, res) => {
          request
            .get('/api/v1/logout')
            .set('Authorization', `Bearer ${res.body.token}`)
            .end((err2, res2) => {
              expect(res2.statusCode).to.be.eql(204)
              expect(serverContext.hasTokenActive(user.id)).to.be.a('null')
              done(err2)
            })
        })
    })
  })
})