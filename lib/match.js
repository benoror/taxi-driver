const _ = require('lodash');
const db = require('../db');

const MATCH_PARAMS = [
  'region',
  'bpType',
  'docType',
  'txType',
  'category',
  'area'
];

exports.matchRules = (query) => {
  const country = query.country;
  const rules = db.get('taxRules');
  const countryRules = filterByCountry(rules, country);
  const taxMatches = groupByTaxes(countryRules, query.taxes);
  const paramsMatches = bestMatchesParams(taxMatches, query, MATCH_PARAMS)

  if(_.isEmpty(countryRules)) {
    throw new Error(`Tax rules for country ${query.country} not found`);
  }

  if(_.isEmpty(paramsMatches)) {
    throw new Error(`No tax rules found for params: ${JSON.stringify(query)}` );
  }

  if(_.isEmpty(taxMatches)) {
    throw new Error(`No tax rules found for taxes: ${JSON.stringify(query.taxes)}` );
  }

  if(paramsMatches.length > query.taxes.length) {
    throw new Error(`More than ${query.taxes.length} rules found (${paramsMatches.length}) for ${JSON.stringify(query)}` );
  }

  if(paramsMatches.length < query.taxes.length) {
    throw new Error(`Less than ${query.taxes.length} rules found (${paramsMatches.length}) for ${JSON.stringify(query)}` );
  }

  return paramsMatches;
}

function filterByCountry(rules, country) {
  return rules.filter({ country: _.toLower(country) }).value();
}

function groupByTaxes(rules, taxes) {
  return _.map(taxes, (tax) => {
    return _.filter(rules, (rule) => {
      return _.toLower(rule.taxName) === _.toLower(tax);
    });
  });
}

function bestMatchesParams(groupedRules, query, params) {
  return _.map(groupedRules, (rules) => {
    return bestMatch(rules, query, params);
  });
}

function bestMatch(h,n,params) {
  return h.sort(function(a,b){
    var c_a=0,c_b=0,p;
    _.forEach(params, (p) => {
      c_a+=Number(_.toLower(a[p])===_.toLower(n[p]));
      c_b+=Number(_.toLower(b[p])===_.toLower(n[p]));
    });
    return (c_a<c_b)?1:-1;return 0;
  })[0];
}

