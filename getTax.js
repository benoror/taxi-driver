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

  const result = _.reduce(params, (res, col) => {
    return _.filter(res, (rule) => {
      if(!!rule[col]) {
        return rule[col] === query[col];
      } else {
        if(!!query[col]) {
          return false;
        } else {
          return rule[col] === query[col];
        }
      }
    });
  }, rules);

  if(_.isEmpty(result)) {
    throw new Error(`No tax rules found for ${JSON.stringify(query)}` );
  }

  if(result.length > 1) {
    throw new Error(`More than one rule found for ${JSON.stringify(query)}` );
  }

  return result[0];
}

const applyRule = (rule, query) => {
  if(!!rule.validUntil && moment(rule.validUntil) < moment()) {
    throw new Error(`Rule date invalid: ${JSON.stringify(rule.validUntil)}` );
  }

  if(!!query.vars) {
    _.forEach(query.vars, (v, k) => parser.setVariable(k, v));
  }

  return parser.parse(rule.formula);
}

module.exports = { getTax, findRule, applyRule };
