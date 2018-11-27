const _ = require('lodash');
const moment = require('moment');
const db = require('./db');
const FormulaParser = require('hot-formula-parser').Parser;
const parser = new FormulaParser();

const getTaxes = (query) => {
  const rules = getRules(query);
  const results = applyRules(rules, query);
  const factorsResults = calculateFactors(results, rules);

  return calculateAmounts(factorsResults, query)
}

const getRules = (query) => {
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

const findByTaxes = (rules, taxes) => {
  return _.filter(rules, (rule) => {
    return _.reduce(taxes, (contains, tax) => {
      return _.toLower(rule.taxName) === _.toLower(tax.name) ? true : contains;
    }, false);
  });
}

const applyRules = (rules, query) => {
  return _.map(rules, (rule) => {
    if(!!rule.validUntil && moment(rule.validUntil) < moment()) {
      throw new Error(`Rule date invalid: ${JSON.stringify(rule.validUntil)}` );
    }

    if(!!query.vars) {
      _.forEach(query.vars, (v, k) => parser.setVariable(k, parser.parse(v).result));
    }

    if(!!rule.vars) {
      _.forEach(rule.vars, (v, k) => parser.setVariable(k, parser.parse(v).result));
    }

    const parseResult = parser.parse(rule.formula);

    return {
      error: parseResult.error,
      name: rule.taxName,
      rate: parseResult.result,
    }
  });
}

const calculateFactors = (results, rules) => {
  return _.map(results, (result) => {
    let factor = result.rate;
    const taxRule = _.find(rules, { taxName: result.name });
    const depTax = _.find(results, { name: taxRule.dep });

    if(!!depTax) {
      factor *= _.find(results, { name: taxRule.dep }).rate;
    }

    return { ...result, factor };
  });
}

const calculateAmounts = (results, query) => {
  return _.map(results, (result) => {
    let amount;

    if(!!query.vars && !!query.vars.subTotal) {
      return { ...result, amount: result.factor * query.vars.subTotal};
    } else {
      return result;
    }
  });
}

module.exports = { getTaxes, getRules, findByCountry, findByParams, applyRules };
