const _ = require('lodash')
const moment = require('moment')
const Currency = require('currency.js')

function evalRules (parser, rules, query) {
  return _.reduce(rules, (accum, rule) => {
    validateDates({ rule, query })
    setVariables({ parser, query, rule })

    return {
      ...accum,
      [rule.taxName]: {
        ...evalFormulas({ parser, rule }),
        meta: rule.meta
      }
    }
  }, {})
}

function validateDates ({ rule, query }) {
  const now = query.date ? moment(query.date) : moment()

  if (!!rule.validFrom && moment(rule.validFrom) > now) {
    const err = new Error(`Rule only valid from: ${JSON.stringify(rule.validFrom)}`)
    err.statusCode = 400
    throw err
  }

  if (!!rule.validUntil && moment(rule.validUntil) < now) {
    const err = new Error(`Rule only valid until: ${JSON.stringify(rule.validUntil)}`)
    err.statusCode = 400
    throw err
  }
}

function setVariables ({ parser, query, rule }) {
  if (query.vars) {
    _.forEach(query.vars, (v, k) => parser.setVariable(k, parseFormulaOrNumber(parser, v).result))
  }

  if (rule.vars) {
    _.forEach(rule.vars, (v, k) => parser.setVariable(k, parseFormulaOrNumber(parser, v).result))
  }
}

function evalFormulas ({ parser, rule }) {
  let tax = {}

  if (rule.rate) {
    tax = { ...tax, rate: parseFormulaOrNumber(parser, rule.rate) }

    if (rule.whitholded) {
      tax.rate.result *= -1
    }
  }

  if (rule.amount) {
    let { error, result } = parseFormulaOrNumber(parser, rule.amount)
    tax = { ...tax, amount: { error, result: Currency(result).value } }
  }

  return tax
}

function parseFormulaOrNumber (parser, value) {
  if (typeof (value) === 'number') {
    return { error: null, result: value }
  } else {
    return parser.parse(value)
  }
}

module.exports = {
  evalRules,
  parseFormulaOrNumber
}
