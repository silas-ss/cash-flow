const jwt = require('jsonwebtoken')

const { User } = require('../models/user')

const userController = {
  register: (req, res) => {
    const userRequest = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    User.create(userRequest).then(() => {
      res.sendStatus(203)
    }).catch(err => {
      res.status(500).send({ msg: err.message })
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
      res.status(500).send({ msg: err.message })
    })
  },
  list: (req, res) => {
    User.findAll().then(users => {
      res.status(200).send(users)
    }).catch(err => {
      res.status(500).send({ msg: err.message })
    })
  },
  find: (req, res) => {
    User.findOne({ where: { id: req.params.id } }).then(user => {
      if (user !== null) {
        res.status(200).send(user)
      } else {
        res.statusStatus(404)
      }
    }).catch(err => {
      res.status(500).send({ msg: err.message })
    })
  },
  update: (req, res) => {
    const userRequest = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    User.findOne({ where: { id: req.params.id } }).then(user => {
      user.name = req.body.name
      user.password = req.body.password
      user.role = req.body.role

      user.save().then(() => {
        res.status(200).send(userRequest)
      }).catch(err => {
        res.status(500).send({ msg: err.message })
      })
    })
  },
  delete: (req, res) => {
    User.findOne({ where: { id: req.params.id } }).then(user => {
      if (user !== null) {
        user.destroy()
        res.sendStatus(200)
      } else {
        res.status(404).send({ msg: "User not found" })
      }
    })
  }
}

module.exports = userController