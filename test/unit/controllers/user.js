const UserController = require('../../../controllers/user')
const CryptService = require('../../../services/crypt')
const JWTService = require('../../../services/jwt')
const ServerContext = require('../../../services/server-context')

describe('User Controller', () => {
  describe('List all users', () => {
    it('should return a list of users', () => {
      const User = {
        findAll: td.function()
      }

      const expectedResponse = [{
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        name: 'User',
        email: 'user@test.com',
        password: '123456789zzzazadfdf',
        role: 'ADMIN',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }]

      td.when(User.findAll()).thenResolve(expectedResponse)

      const userController = new UserController(User)
      return userController.list()
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Get user by id', () => {
    it('should return a user', () => {
      const User = {
        findOne: td.function()
      }

      const expectedResponse = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        name: 'User',
        email: 'user@test.com',
        password: '123456789zzzazadfdf',
        role: 'ADMIN',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }

      td.when(User.findOne({ where: { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' } })).thenResolve(expectedResponse)

      const userController = new UserController(User)
      return userController.find({ id: '229f6276-5ea0-4c93-a022-d63f856cdf93' })
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Update user', () => {
    it('should update a user', () => {
      const User = {
        update: td.function()
      }

      const updatedUser = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        name: 'User',
        email: 'user@test.com',
        password: '123456789zzzazadfdf',
        role: 'ADMIN'
      }

      td.when(User.update(updatedUser, { where: { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' } })).thenResolve([1])

      const userController = new UserController(User)
      return userController.update(updatedUser, { id: '229f6276-5ea0-4c93-a022-d63f856cdf93' })
        .then(response => expect(response).to.be.eql([1]))
    })
  })

  describe('Create user', () => {
    it('should create a user', () => {
      const User = {
        create: td.function()
      }

      const newUser = {
        name: 'User',
        email: 'user@test.com',
        password: '123456789zzzazadfdf',
        role: 'ADMIN'
      }

      const expectedResponse = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        name: 'User',
        email: 'user@test.com',
        password: '123456789zzzazadfdf',
        role: 'ADMIN',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }

      td.when(User.create(newUser)).thenResolve(expectedResponse)

      const userController = new UserController(User, {}, {}, CryptService)
      return userController.register(newUser)
        .then(response => expect(response).to.be.eql(expectedResponse))
    })
  })

  describe('Delete user', () => {
    it('should delete a user', () => {
      const User = {
        destroy: td.function()
      }

      const where = { id: '229f6276-5ea0-4c93-a022-d63f856cdf93'}

      td.when(User.destroy({ where })).thenResolve([1])

      const userController = new UserController(User)
      return userController.delete(where)
        .then(response => expect(response).to.be.eql([1]))
    })
  })

  describe('Authenticate user', () => {
    it('should delete a user', () => {
      const User = {
        findOne: td.function()
      }

      const JWTServiceMock = {
        tokenGenerate: td.function()
      }

      const ServerContextMock = {
        hasTokenActive: td.function(),
        setToken: td.function()
      }

      const authData = { email: 'user@test.com', password: '123456789zzzazadfdf' }

      const where = { email: authData.email, password: CryptService.cipher(authData.password) }

      const user = {
        id: '229f6276-5ea0-4c93-a022-d63f856cdf93',
        name: 'User',
        email: 'user@test.com',
        password: '123456789zzzazadfdf',
        role: 'ADMIN',
        createdAt: "2019-04-11T21:43:23.054Z",
        updatedAt: "2019-04-11T21:43:23.054Z"
      }

      td.when(User.findOne({ where })).thenResolve(user)

      const expectedToken = '1a2b3c'
      td.when(JWTServiceMock.tokenGenerate({ id: user.id, role: user.role }, {})).thenReturn(expectedToken)

      td.when(ServerContextMock.hasTokenActive(user.id)).thenReturn(null)
      td.when(ServerContextMock.setToken(user.id, expectedToken)).thenDo((userId, token) => {})

      const userController = new UserController(User, JWTServiceMock, ServerContextMock, CryptService)
      return userController.auth(authData)
        .then(response => expect(response.token).to.be.eql(expectedToken))
    })
  })
})