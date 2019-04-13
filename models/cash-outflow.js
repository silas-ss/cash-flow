module.exports = (sequelize, DataTypes) => {
  const CashOutflow = sequelize.define('CashOutflow', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    dateBilled: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'date_billed'
    }
  }, {
    tableName: 't_cash_outflow'
  })

  return CashOutflow
}