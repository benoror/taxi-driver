var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

var res = parser.parse('IF(1=2, "a", "b")'); // It returns `Object {error: null, result: 14}`

console.log(res);

function getTax(payload) {
}

module.exports = getTax
