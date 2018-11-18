const _ = require('lodash');
const moment = require('moment');
const db = require('./db');
const FormulaParser = require('hot-formula-parser').Parser;
const parser = new FormulaParser();

const getTax = (countryCode, query) => {
  const rules = db.get('taxRules')
                  .filter({ countryCode })
                  .value();

  if(_.isEmpty(rules)) {
    throw new Error(`Tax rules for country ${countryCode} not found` );
  }

  const rule = findRule(rules, query);

  return applyRule(rule, query);
}

const findRule = (rules, query) => {
  const params = db.get('meta.taxRulesParams').value();

  const matches = _.reduce(params, (match, param) => {
    return _.filter(match, (rule) => {
      if(rule[param] === undefined) {
        return query[param] === undefined;
      } else {
        return query[param] === rule[param];
      }
    });
  }, rules);

  if(_.isEmpty(matches)) {
    throw new Error(`No tax rules found for ${JSON.stringify(query)}` );
  }

  if(matches.length > 1) {
    throw new Error(`More than one rule found for ${JSON.stringify(query)}` );
  }

  return matches[0];
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

module.exports = { getTax, findRule, applyRule };
