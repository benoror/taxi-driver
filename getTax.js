const _ = require('lodash');
const moment = require('moment');
const db = require('./db');
const FormulaParser = require('hot-formula-parser').Parser;
const parser = new FormulaParser();

const getTax = (query) => {
  const rule = getRule(query);

  return applyRule(rule, query);
}

const getRule = (query) => {
  const country = query.country;
  const rules = db.get('taxRules');
  const params = db.get('meta.taxRulesParams');
  const countryRules = findByCountry(rules, country);
  const paramsMatches = findByParams(countryRules, query, params.value());
  const taxMatches = findByTaxes(paramsMatches, query.taxes);

  if(_.isEmpty(rules)) {
    throw new Error(`Tax rules for country ${query.country} not found`);
  }

  if(_.isEmpty(paramsMatches)) {
    throw new Error(`No tax rules found for params: ${JSON.stringify(query)}` );
  }

  if(_.isEmpty(taxMatches)) {
    throw new Error(`No tax rules found for taxes: ${JSON.stringify(query.taxes)}` );
  }

  if(taxMatches.length > query.taxes.length) {
    throw new Error(`More than ${query.taxes.length} rule found for ${JSON.stringify(query)}` );
  }

  return taxMatches[0];
}

const findByCountry = (rules, country) => {
  return rules.filter({ country: _.toLower(country) }).value();
}

const findByParams = (rules, query, params) => {
  return _.reduce(params, (match, param) => {
    return _.filter(match, (rule) => {
      if(rule[param] === undefined) {
        return query[param] === undefined;
      } else {
        return _.toLower(query[param]) === _.toLower(rule[param]);
      }
    });
  }, rules);
}

const findByTaxes = (rules, taxes) => {
  return _(rules)
    .keyBy((rule) => _.toLower(rule.taxName))
    .at(_.map(taxes, (tax) => _.toLower(tax)))
    .value()
}

const applyRule = (rule, query) => {
  if(!!rule.validUntil && moment(rule.validUntil) < moment()) {
    throw new Error(`Rule date invalid: ${JSON.stringify(rule.validUntil)}` );
  }

  if(!!query.vars) {
    _.forEach(query.vars, (v, k) => parser.setVariable(k, parser.parse(v).result));
  }

  if(!!rule.vars) {
    _.forEach(rule.vars, (v, k) => parser.setVariable(k, parser.parse(v).result));
  }

  return parser.parse(rule.formula);
}

module.exports = { getTax, getRule, findByCountry, findByParams, applyRule };
