const _ = require('lodash');
const moment = require('moment');
const FormulaParser = require('hot-formula-parser').Parser;
const Currency = require('currency.js');
const { matchRules } = require('./match');

const getTaxes = (query) => {
  const parser = new FormulaParser();
  const rules = matchRules(query);
  const results = applyRules(parser, rules, query);
  const factorsResults = calculateFactors(results, rules);
  const amountsResults = calculateAmounts(parser, factorsResults, query)

  return calculateTotals(parser, amountsResults, query);
}

const parseFormulaOrNumber = (parser, value) => {
  if(typeof(value) === 'number') {
    return { error: null, result: value };
  } else {
    return parser.parse(value);
  }
}

const applyRules = (parser, rules, query) => {
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

const FACTOR_PRECISION = 8;

const calculateFactors = (taxes, rules) => {
  return _.reduce(taxes, (accum, tax, taxName) => {
    let factor = tax.rate && tax.rate.result;
    const taxRule = _.find(rules, { taxName });
    const depTax = taxes[taxRule.dep];

    if(typeof(factor) === "number") {
      if(!!depTax) {
        factor = Currency(depTax.rate.result, { precision: FACTOR_PRECISION })
          .multiply(factor).value
      }

      return {
        ...accum,
        [taxName]: {
          ...tax,
          factor: {
            error: null,
            result: factor
          }
        }
      };
    } else {
      return { ...accum, [taxName]: tax };
    }
  }, {});
}

const calculateAmounts = (parser, taxes, query) => {
  return _.reduce(taxes, (accum, tax, taxName) => {
    const subTotal = parser.getVariable('subTotal');
    const amount = tax.amount && tax.amount.result;

    if(subTotal && !amount) {
      return {
        ...accum,
        [taxName]: {
          ...tax,
          amount: {
            error: null,
            result: Currency(subTotal).multiply(tax.factor.result).value
          }
        }
      };
    } else {
      return { ...accum, [taxName]: tax };
    }
  }, {});
}

const calculateTotals = (parser, taxes, query) => {
  const subTotal = parser.getVariable('subTotal');

  if(subTotal) {
    const taxTotal = _.reduce(taxes, (sum, tax) => {
      return Currency(tax.amount.result).add(sum).value;
    }, 0);

    return {
      subTotal: Currency(subTotal).value,
      taxTotal,
      grandTotal: Currency(taxTotal).add(subTotal).value,
      taxes,
    };
  } else {
    return { taxes };
  }
}

module.exports = {
  getTaxes,
  applyRules,
  FACTOR_PRECISION
};
