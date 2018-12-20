const CurrencyJS = require('currency.js')

const CURRENCY_PRECISION = 8
const FACTOR_PRECISION = 8

module.exports = {
  CURRENCY_PRECISION,
  FACTOR_PRECISION,

  Currency (...args) {
    return CurrencyJS(args[0], { ...args[1], precision: CURRENCY_PRECISION })
  },

  Factor (...args) {
    return CurrencyJS(args[0], { ...args[1], precision: FACTOR_PRECISION })
  }
}
