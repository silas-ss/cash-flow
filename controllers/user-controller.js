const jwt = require('jsonwebtoken')

const { User } = require('../models/user')

const userController = {
  register: (req, res) => {
    const userRequest = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      group: req.body.group
    }
    User.create(userRequest).then(() => {
      res.status(203)
    }).catch(err => {
      res.status(500).send(err.message)
    })
  },
  auth: (req, res) => {
    User.findOne({ where: { email: req.body.email, password: req.body.password } }).then(user => {
      if (user !== null) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET, { expiresIn: 300 })
        res.status(300).send({ token })
      } else {
        res.status(500).send({ msg: 'Email or password incorrect!' })
      }
    }).catch(err => {
      res.status(500).send(err.message)
    })
  }
}

module.exports = userController