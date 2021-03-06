const CryptService = require('../../services/crypt')

describe('Routes Users', () => {
  const User = app.datasource.models.User

  const user = {
    id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
    name: 'User',
    email: 'user@test.com',
    password: CryptService.cipher('userpassword'),
    role: 'ADMIN'
  }

  const defaultAuthData = { email: user.email, password: 'userpassword' }

  var token = null

  beforeEach(done => {
    User.destroy({ where: {} })
      .then(() => User.create(user))
      .then(() => {
        request
          .post('/api/v1/auth')
          .send(defaultAuthData)
          .end((err, res) => {
            token = res.body.token
            done()
          })
      })
  })

  describe('Route GET /users', () => {
    it('should return a list of users', done => {
      request.get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].name).to.be.eql(user.name)
          expect(res.body[0].email).to.be.eql(user.email)
          expect(res.body[0].password).to.be.eql(user.password)
          expect(res.body[0].role).to.be.eql(user.role)

          done(err)
        })
    })
  })

  describe('Route GET /users/:id', () => {
    it('should return a user', done => {
      request.get(`/api/v1/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(user.id)
          expect(res.body.name).to.be.eql(user.name)
          expect(res.body.email).to.be.eql(user.email)
          expect(res.body.password).to.be.eql(user.password)
          expect(res.body.role).to.be.eql(user.role)

          done(err)
        })
    })
  })

  describe('Route POST /users', () => {
    const user2 = {
      id: '318edf5f-a99d-42a5-98a4-a07ab58a645e',
      name: 'User 2',
      email: 'user2@test.com',
      password: CryptService.cipher('user2password'),
      role: 'OPERATOR'
    }

    it('should create a user', done => {
      request.post('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(user2)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(201)

          done(err)
        })
    })
  })

  describe('Route PUT /users/:id', () => {
    const updatedUser = {
      id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
      name: 'User Updated',
      email: 'user@test.com',
      password: CryptService.cipher('userpassword'),
      role: 'ADMIN'
    }
    const expectedResponse = [1]
    it('should update a user', done => {
      request.put(`/api/v1/users/${updatedUser.id}`)
        .send(updatedUser)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.eql(expectedResponse)

          done(err)
        })
    })
  })

  describe('Route DELETE /users/:id', () => {
    it('should update a user', done => {
      request.put(`/api/v1/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(200)

          done(err)
        })
    })
  })
})