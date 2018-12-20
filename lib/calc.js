const _ = require('lodash')
const { Currency, Factor } = require('./decimal_precision')

function calculate (parser, match, evaluate) {
  const factorsResults = calculateFactors(evaluate, match)
  const amountsResults = calculateAmounts(parser, factorsResults)
  return calculateTotals(parser, amountsResults)
}

function calculateFactors (taxes, rules) {
  return _.reduce(taxes, (accum, tax, taxName) => {
    let factor = tax.rate && tax.rate.result

    if (typeof (factor) === 'number') {
      const taxRule = _.find(rules, { taxName })
      const depTax = taxes[taxRule.dep]

      if (depTax) {
        factor = Factor(depTax.rate.result)
          .multiply(factor).value
      }

      return {
        ...accum,
        [taxName]: {
          ...tax,
          factor: {
            error: null,
            result: factor
          }
        }
      }
    } else {
      return { ...accum, [taxName]: tax }
    }
  }, {})
}

function calculateAmounts (parser, taxes) {
  return _.reduce(taxes, (accum, tax, taxName) => {
    const subTotal = parser.getVariable('subTotal')
    const amount = tax.amount && tax.amount.result

    if (subTotal && !amount) {
      return {
        ...accum,
        [taxName]: {
          ...tax,
          amount: {
            error: null,
            result: Currency(subTotal).multiply(tax.factor.result).value
          }
        }
      }
    } else {
      return { ...accum, [taxName]: tax }
    }
  }, {})
}

function calculateTotals (parser, taxes) {
  const subTotal = parser.getVariable('subTotal')

  if (subTotal) {
    const taxTotal = _.reduce(taxes, (sum, tax) => {
      return Currency(tax.amount.result).add(sum).value
    }, 0)

    return {
      subTotal: Currency(subTotal).value,
      taxTotal,
      grandTotal: Currency(taxTotal).add(subTotal).value,
      taxes
    }
  } else {
    return { taxes }
  }
}

module.exports = {
  calculate,
  calculateFactors,
  calculateAmounts,
  calculateTotals
}
