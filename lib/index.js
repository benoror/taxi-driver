const FormulaParser = require('hot-formula-parser').Parser;
const { matchRules } = require('./match');
const { evalRules } = require('./eval');
const { calculate } = require('./calc');

exports.getTaxes = (query) => {
  const parser = new FormulaParser();
  const match = matchRules(query);
  const evaluate = evalRules(parser, match, query);
  const results = calculate(parser, match, evaluate);

  return results;
}
