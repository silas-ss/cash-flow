const { Sequelize, sequelize } = require('../config/database-config')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  group: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 't_user'
})

module.exports = { User }