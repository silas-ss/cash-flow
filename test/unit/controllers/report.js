const ReportController = require('../../../controllers/report')

const QUERY_REPORT_WITHOUT_DATE_RANGE = `select cash_inflow.cash_inflow_amount, cash_outflow.cash_outflow_amount
FROM (select sum(amount) as cash_inflow_amount from t_cash_inflow) as cash_inflow,
(select sum(amount) as cash_outflow_amount from t_cash_outflow) as cash_outflow`

const QUERY_REPORT_WITH_DATE_RANGE = `select cash_inflow.cash_inflow_amount, cash_outflow.cash_outflow_amount
FROM (select sum(amount) as cash_inflow_amount from t_cash_inflow WHERE date_paid BETWEEN :from_date_paid AND :to_date_paid) as cash_inflow,
(select sum(amount) as cash_outflow_amount from t_cash_outflow WHERE date_billed BETWEEN :from_date_billed AND :to_date_billed) as cash_outflow`

describe('Report Controller', () => {
  describe('Get Report Amount without range dates', () => {
    it('should return amount of cash-inflow and cash-outflow', () => {
      const Sequelize = {
        query: td.function(),
        QueryTypes: {
          SELECT: 'SELECT'
        }
      }

      const expectedResponse = [{
        cash_inflow_amount: 50000.00,
        cash_outflow_amount: 20000.00
      }]

      const expectedResult = {
        cashInflowAmount: 50000.00,
        cashOutflowAmount: 20000.00
      }

      const params = { type: Sequelize.QueryTypes.SELECT }

      td.when(Sequelize.query(QUERY_REPORT_WITHOUT_DATE_RANGE, params)).thenResolve(expectedResponse)

      const reportController = new ReportController(Sequelize)
      reportController.getData({})
        .then(result => expect(result).to.be.eql(expectedResult))
    })
  })

  describe('Get Report Amount with range dates', () => {
    it('should return amount of cash-inflow and cash-outflow with range dates', () => {
      const Sequelize = {
        query: td.function(),
        QueryTypes: {
          SELECT: 'SELECT'
        }
      }

      const expectedResponse = [{
        cash_inflow_amount: 20000.00,
        cash_outflow_amount: 10000.00
      }]

      const expectedResult = {
        cashInflowAmount: 20000.00,
        cashOutflowAmount: 10000.00
      }

      const dates = { from: '2019-04-01', to: '2019-04-30' }
      const params = { 
        replacements: {
          from_date_paid: dates.from,
          to_date_paid: dates.to,
          from_date_billed: dates.from,
          to_date_billed: dates.to
        },
        type: Sequelize.QueryTypes.SELECT
      }

      td.when(Sequelize.query(QUERY_REPORT_WITH_DATE_RANGE, params)).thenResolve(expectedResponse)

      const reportController = new ReportController(Sequelize)
      reportController.getData(dates)
        .then(result => expect(result).to.be.eql(expectedResult))
    })
  })
})