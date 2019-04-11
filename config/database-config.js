const Sequelize = require('sequelize')

const sequelize = new Sequelize('cash-flow', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = { Sequelize, sequelize }