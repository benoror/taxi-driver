const _ = require('lodash');
const db = require('./db');
var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

const salesTax = (countryCode, query) => {
  const rules = db.get('taxRules')
                  .filter({ countryCode })
                  .value();

  if(_.isEmpty(rules)) {
    throw new Error(`Tax rules for country ${countryCode} not found` );
  }

  const rule = findRule(rules, query);

  return applyRule(rule, query);
}

function findRule(rules, query) {
  const columns = db.get('meta.taxRulesColumns').value();

  const result = _.reduce(columns, (res, col) => {
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

function applyRule(rule, query) {
//2012-04-23T18:25:43.511Z
  if(!!query.vars) {
    _.forEach(query.vars, (v, k) => parser.setVariable(k, v));
  }

  return parser.parse(rule.formula);
}

exports.salesTax = salesTax;
