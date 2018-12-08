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

  if (_.isEmpty(countryRules)) {
    throw new Error(`Tax rules for country ${query.country} not found`)
  }

  return paramsMatches
}

function filterByCountry (rules, country) {
  return rules.filter({ country: _.toLower(country) }).value()
}

function groupByTaxes (rules, taxes) {
  return _.map(taxes, (tax) => {
    const taxRules = _.filter(rules, (rule) => {
      return _.toLower(rule.taxName) === _.toLower(tax)
    })

    if (_.isEmpty(taxRules)) {
      throw new Error(`Tax rules not found for tax: ${JSON.stringify(tax)}`)
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
  const sorted = rules.sort((a, b) => {
    let scoreA = 0
    let scoreB = 0

    _.forEach(params, (param) => {
      scoreA += Number(_.toLower(a[param]) === _.toLower(query[param]))
      scoreB += Number(_.toLower(b[param]) === _.toLower(query[param]))
    })

    if (scoreA < scoreB) {
      return 1
    }

    if (scoreA > scoreB) {
      return -1
    }

    return 0
  })

  return sorted[0]
}

module.exports = {
  matchRules,
  bestMatch
}
