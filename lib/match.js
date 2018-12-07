const _ = require('lodash');
const db = require('../db');

exports.matchRules = (query) => {
  const country = query.country;
  const rules = db.get('taxRules');
  const params = db.get('meta.optionalParams');
  const countryRules = filterByCountry(rules, country);
  const paramsMatches = findByParams(countryRules, query, params.value());
  const taxMatches = findByTaxes(paramsMatches, query.taxes);
  console.log(taxMatches)

  if(_.isEmpty(countryRules)) {
    throw new Error(`Tax rules for country ${query.country} not found`);
  }

  if(_.isEmpty(paramsMatches)) {
    throw new Error(`No tax rules found for params: ${JSON.stringify(query)}` );
  }

  if(_.isEmpty(taxMatches)) {
    throw new Error(`No tax rules found for taxes: ${JSON.stringify(query.taxes)}` );
  }

  if(taxMatches.length > query.taxes.length) {
    throw new Error(`More than ${query.taxes.length} rules found (${taxMatches.length}) for ${JSON.stringify(query)}` );
  }

  if(taxMatches.length < query.taxes.length) {
    throw new Error(`Less than ${query.taxes.length} rules found (${taxMatches.length}) for ${JSON.stringify(query)}` );
  }

  return taxMatches;
}

const filterByCountry = (rules, country) => {
  return rules.filter({ country: _.toLower(country) }).value();
}

const findByParams = (rules, query, params) => {
  return _.reduce(params, (match, param) => {
    return _.filter(match, (rule) => {
      if(query[param] === undefined) {
        return true;
      } else {
        return _.toLower(query[param]) === _.toLower(rule[param]);
      }
    });
  }, rules);
}

// Get all rules that CONTAINS any of taxes
const findByTaxes = (rules, taxes) => {
  return _.filter(rules, (rule) => {
    return _.reduce(taxes, (contains, tax) => {
      return _.toLower(rule.taxName) === _.toLower(tax) ? true : contains;
    }, false);
  });
}
