const _ = require('lodash')
const db = require('../db')
const moment = require('moment')

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
  const matches = _.map(groupedRules, (rules) => {
    const match = bestMatch(rules, query, params)

    if (!match) {
      const err = new Error(`Could not match any tax rules for query params: ${JSON.stringify(query)}`)
      err.statusCode = 404
      throw err
    }

    return match
  })

  return matches
}

function bestMatch (rules, query, params) {
  let maxCount = 0
  let bestRule = rules[0]
  _.forEach(rules, (rule) => {
    let currCount = 0
    _.forEach(params, (param) => {
      if (_.toLower(rule[param]) === _.toLower(query[param])) {
        currCount++
      }
    })

    if (query['date']) {
      let date = moment(query['date'])
      if (moment(rule.validFrom) <= date && moment(rule.validUntil) >= date) {
        currCount++
      }
    }

    if (currCount > maxCount) {
      maxCount = currCount
      bestRule = rule
    }
  })
  return bestRule
}

module.exports = {
  matchRules,
  bestMatch
}
