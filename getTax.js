const _ = require('lodash');
const db = require('./db');
var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

const salesTax = (countryCode, payload) => {
  const rules = db.get('taxRules')
                  .filter({ countryCode })
                  .value();

  if(_.isEmpty(rules)) {
    return { error: `Tax rules for country ${countryCode} not found` };
  }

  const rule = findRule(rules, payload);

  if(!!payload.vars) {
    _.forEach(payload.vars, (v, k) => parser.setVariable(k, v));
  }

  return parser.parse(rule.formula);
}

function findRule(rules, payload) {
  const columns = db.get('meta.taxRulesColumns').value();

  const result = _.reduce(columns, (res, col) => {
    return _.filter(res, (rule) => {
      if(!!rule[col]) {
        return rule[col] === payload[col];
      } else {
        if(!!payload[col]) {
          return false;
        } else {
          return rule[col] === payload[col];
        }
      }
    });
  }, rules);

  if(_.isEmpty(result)) {
    return { error: `No tax rules found for ${JSON.stringify(payload)}` };
  }

  if(result.length > 1) {
    return { error: `More than one rule found for ${JSON.stringify(payload)}` };
  }

  return result[0];
}

exports.salesTax = salesTax;
