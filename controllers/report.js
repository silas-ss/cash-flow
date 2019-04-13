const QUERY_REPORT_WITHOUT_DATE_RANGE = `select cash_inflow.cash_inflow_amount, cash_outflow.cash_outflow_amount
FROM (select sum(amount) as cash_inflow_amount from t_cash_inflow) as cash_inflow,
(select sum(amount) as cash_outflow_amount from t_cash_outflow) as cash_outflow`

const QUERY_REPORT_WITH_DATE_RANGE = `select cash_inflow.cash_inflow_amount, cash_outflow.cash_outflow_amount
FROM (select sum(amount) as cash_inflow_amount from t_cash_inflow WHERE date_paid BETWEEN :from_date_paid AND :to_date_paid) as cash_inflow,
(select sum(amount) as cash_outflow_amount from t_cash_outflow WHERE date_billed BETWEEN :from_date_billed AND :to_date_billed) as cash_outflow`

module.exports = class ReportController {
  constructor (sequelize) {
    this.sequelize = sequelize
  }

  getData (params) {
    const query = (Object.keys(params).length === 0) ? QUERY_REPORT_WITHOUT_DATE_RANGE : QUERY_REPORT_WITH_DATE_RANGE
    let queryParams = {type: this.sequelize.QueryTypes.SELECT}
    if (Object.keys(params).length > 0) {
      queryParams = { 
        replacements: {
          from_date_paid: params.from,
          to_date_paid: params.to,
          from_date_billed: params.from,
          to_date_billed: params.to
        },
        type: queryParams.type
      }
    }
    
    return this.sequelize.query(query, queryParams)
      .then(result => {
        return {
          cashInflowAmount: result[0].cash_inflow_amount,
          cashOutflowAmount: result[0].cash_outflow_amount
        }
      })
      .catch(err => err)
  }
}