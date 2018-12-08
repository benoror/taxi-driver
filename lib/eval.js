const _ = require('lodash');
const moment = require('moment');
const Currency = require('currency.js');

function evalRules(parser, rules, query) {
  return _.reduce(rules, (accum, rule) => {
    let tax = {};

    if(!!rule.validUntil && moment(rule.validUntil) < moment()) {
      throw new Error(`Rule date invalid: ${JSON.stringify(rule.validUntil)}` );
    }

    if(!!query.vars) {
      _.forEach(query.vars, (v, k) => parser.setVariable(k, parseFormulaOrNumber(parser, v).result));
    }

    if(!!rule.vars) {
      _.forEach(rule.vars, (v, k) => parser.setVariable(k, parseFormulaOrNumber(parser, v).result));
    }

    if(!!rule.rate) {
      tax = {...tax, rate: parseFormulaOrNumber(parser, rule.rate)};

      if(!!rule.whitholded) {
        tax.rate.result *= -1;
      }
    }

    if(!!rule.amount) {
      let {error, result} = parseFormulaOrNumber(parser, rule.amount);
      tax = {...tax, amount: {error, result: Currency(result).value}};
    }

    if(!!rule.meta) {
      tax = {...tax, meta: rule.meta};
    }

    return {
      ...accum,
      [rule.taxName]: tax
    };
  }, {});
}

function parseFormulaOrNumber(parser, value) {
  if(typeof(value) === 'number') {
    return { error: null, result: value };
  } else {
    return parser.parse(value);
  }
}

module.exports = {
  evalRules,
  parseFormulaOrNumber
}
