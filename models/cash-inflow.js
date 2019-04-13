module.exports = (sequelize, DataTypes) => {
  const CashInflow = sequelize.define('CashInflow', {
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
    datePaid: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'date_paid'
    }
  }, {
    tableName: 't_cash_inflow'
  })

  return CashInflow
}
