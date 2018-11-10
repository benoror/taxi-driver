const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);
const _ = require('lodash');
const FormulaParser = require('hot-formula-parser').Parser;
const parser = new FormulaParser();

const columns = ['taxType', 'bpTaxType', 'category', 'area'];

function getTax(countryCode, payload) {
  const rules = db.get('taxRules')
                  .filter({ countryCode })
                  .value();

  if(_.isEmpty(rules)) {
    return { error: `Tax rules for country ${country} not found` };
  }

  const rule = findRule(rules, payload);

  return parser.parse(rule.formula);
}

function findRule(rules, payload) {
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

module.exports = getTax
