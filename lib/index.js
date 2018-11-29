const _ = require('lodash');
const moment = require('moment');
const db = require('../db');
const FormulaParser = require('hot-formula-parser').Parser;
const parser = new FormulaParser();
const Currency = require('currency.js');

const getTaxes = (query) => {
  const rules = getRules(query);
  const results = applyRules(rules, query);
  const factorsResults = calculateFactors(results, rules);
  const amountsResults = calculateAmounts(factorsResults, query)

  return calculateTotals(amountsResults, query);
}

const getRules = (query) => {
  const country = query.country;
  const rules = db.get('taxRules');
  const params = db.get('meta.optionalParams');
  const countryRules = findByCountry(rules, country);
  const paramsMatches = findByParams(countryRules, query, params.value());
  const taxMatches = findByTaxName(paramsMatches, query.taxes);

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

  return taxMatches;
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

const findByTaxName = (rules, taxes) => {
  return _.filter(rules, (rule) => {
    return _.reduce(taxes, (contains, tax) => {
      return _.toLower(rule.taxName) === _.toLower(tax) ? true : contains;
    }, false);
  });
}

const applyRules = (rules, query) => {
  return _.reduce(rules, (accum, rule) => {
    let tax = {};

    if(!!rule.validUntil && moment(rule.validUntil) < moment()) {
      throw new Error(`Rule date invalid: ${JSON.stringify(rule.validUntil)}` );
    }

    if(!!query.vars) {
      _.forEach(query.vars, (v, k) => parser.setVariable(k, parser.parse(v).result));
    }

    if(!!rule.vars) {
      _.forEach(rule.vars, (v, k) => parser.setVariable(k, parser.parse(v).result));
    }

    if(!!rule.rate) {
      tax = {...tax, rate: parser.parse(rule.rate)};

      if(!!rule.whitholded) {
        tax.rate.result *= -1;
      }
    }

    if(!!rule.amount) {
      tax = {...tax, amount: parser.parse(rule.amount)};
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
  }, {});
}

const calculateAmounts = (taxes, query) => {
  return _.reduce(taxes, (accum, tax, taxName) => {
    if(!!query.vars && !!query.vars.subTotal && !query.vars.amount) {
      return {
        ...accum,
        [taxName]: {
          ...tax,
          amount: {
            error: null,
            result: Currency(query.vars.subTotal).multiply(tax.factor.result).value
          }
        }
      };
    } else {
      return { ...accum, [taxName]: tax };
    }
  }, {});
}

const calculateTotals = (taxes, query) => {
  if(!!query.vars && !!query.vars.subTotal) {
    const taxTotal = _.reduce(taxes, (sum, tax) => {
      return Currency(tax.amount.result).add(sum).value;
    }, 0);
    const subTotal = Currency(query.vars.subTotal).value;
    const grandTotal = Currency(taxTotal).add(subTotal).value;

    return {
      subTotal,
      taxTotal,
      grandTotal,
      taxes,
    };
  } else {
    return { taxes };
  }
}

module.exports = {
  getTaxes,
  getRules,
  findByCountry,
  findByParams,
  applyRules,
  FACTOR_PRECISION
};