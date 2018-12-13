const _ = require('lodash')
const db = require('../db')

const MATCH_PARAMS = [
  'region',
  'bpType',
  'docType',
  'txType',
  'category',
  'area'
]

function matchRules (query) {
  const country = query.country
  const rules = db.get('taxRules')
  const countryRules = filterByCountry(rules, country)
  const taxMatches = groupByTaxes(countryRules, query.taxes)
  const paramsMatches = bestMatchesParams(taxMatches, query, MATCH_PARAMS)

  return paramsMatches
}

function filterByCountry (rules, country) {
  const countryRules = rules.filter({ country: _.toLower(country) }).value()

  if (_.isEmpty(countryRules)) {
    const err = new Error(`Tax rules for country ${country} not found`)
    err.statusCode = 404
    throw err
  }

  return countryRules
}

function groupByTaxes (rules, taxes) {
  return _.map(taxes, (tax) => {
    const taxRules = _.filter(rules, (rule) => {
      return _.toLower(rule.taxName) === _.toLower(tax)
    })

    if (_.isEmpty(taxRules)) {
      const err = new Error(`Tax rules not found for tax: ${JSON.stringify(tax)}`)
      err.statusCode = 404
      throw err
    }

    return taxRules
  })
}

function bestMatchesParams (groupedRules, query, params) {
  return _.map(groupedRules, (rules) => {
    return bestMatch(rules, query, params)
  })
}

function bestMatch (rules, query, params) {
  let maxCount = 0
  let bestRule
  _.forEach(rules, (rule) => {
    let currCount = 0
    _.forEach(params, (param) => {
      if (rule[param] && query[param]) {
        if (_.toLower(rule[param]) === _.toLower(query[param])) {
          currCount++
          if (currCount > maxCount) {
            maxCount = currCount
            bestRule = rule
          }
        }
      }
    })
  })
  return bestRule
}

module.exports = {
  matchRules,
  bestMatch
}
