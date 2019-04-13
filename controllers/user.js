module.exports = class UserController {
  constructor (User, JWTService, ServerContext, CryptService) {
    this.User = User
    this.jwtService = JWTService
    this.serverContext = ServerContext
    this.cryptService = CryptService
  }

  register (data) {
    data.password = this.cryptService.cipher(data.password)
    return this.User.create(data)
      .then(result => result)
      .catch(err => err)
  }

  logout (userId) {
    this.serverContext.setToken(userId, null)
  }

  auth (params) {
    const where = { email: params.email, password: this.cryptService.cipher(params.password) }
    return this.User.findOne({ where }).then(user => {
      if (user !== null) {
        let token = this.serverContext.hasTokenActive(user.id)
        if (token === null) {
          const payload = { id: user.id, role: user.role }
          const config = {}
          token = this.jwtService.tokenGenerate(payload, config)
          this.serverContext.setToken(user.id, token)
        }
        return { token }
      } else {
        return { message: 'Email or password incorrect!' }
      }
    }).catch(err => err)
  }

  list () {
    return this.User.findAll()
      .then(result => result)
      .catch(err => err)
  }

  find (params) {
    return this.User.findOne({ where: params })
      .then(result => result)
      .catch(err => err)
  }

  update (data, params) {
    return this.User.update(data, { where: params })
      .then(result => result)
      .catch(err => err)
  }

  delete (req, res) {
    return this.User.destroy({ where: params })
      .then(result => result)
      .catch(err => err)
  }
}
