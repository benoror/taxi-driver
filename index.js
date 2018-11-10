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

  value = matchRules(payload);

  return value;
}

function matchRules(payload) {
  const countryRules = rules[payload.country];
  const keys = _.keys(_.omit(payload, 'country'));

  const match = _.reduce(keys, (accum, key) => {
    return _.filter(accum, (rule) => {
      return rule[key] === payload[key];
    });
  }, countryRules);

  if(match.length > 1) {
    return { error: `Two or more rules match`, match };
  }

  // ToDo: Optimize and set variables in prev. iteration?
  _.forEach(keys, (key) => {
    parser.setVariable(key, payload[key]);
  });

  return parser.parse(match[0].value);
}


module.exports = getTax
