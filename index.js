var _ = require('lodash');
var rules = require('./rules');
var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

var res = parser.parse('IF(1=2, "a", "b")'); // It returns `Object {error: null, result: 14}`

function getTax(payload) {
  var value;

  if(!_.has(payload, 'country')) {
    return { error: 'Country not found or not specified', value };
  }

  if(!rules[payload.country]) {
    return { error: `Tax rules for country ${payload.country} not found`, value };
  }

  const rule = matchRules(_.omit(payload, 'country'), payload.country);
  value = parser.parse(rule.formula);

  return value;
}

function matchRules(payload, country) {
  const countryRules = rules[country];
  const keys = _.keys(payload);

  // Find the rules with max number of key matching
  // ToDo: Detect when 2+ rules match?
  const maxMatch = _.reduce(keys, (res, key) => {
    // ToDo: Refactor to use _.isMatch or _.matches ?
    const matches = _.filter(countryRules, (rule) => (rule[key] === payload[key]));
    if(res.max < matches.length) {
      // Fixme: Take first match only?
      return {max: matches.length, pos: _.indexOf(countryRules, matches[0])}
    }
    return res;
  }, { max: 0, pos: null });

  const finalMatch = countryRules[maxMatch.pos];

  // ToDo: Optimize and set variables in prev. iteration?
  _.forEach(keys, (key) => {
    parser.setVariable(key, payload[key]);
  });

  return finalMatch;
}


module.exports = getTax
