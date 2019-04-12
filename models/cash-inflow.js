const { Sequelize, sequelize } = require('../config/database-config')

const CashInflow = sequelize.define('cash_inflow', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  datePaid: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false
  }
}, {
  tableName: 't_cash_inflow'
})

module.exports = { CashInflow }