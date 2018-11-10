var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

var res = parser.parse('IF(1=2, "a", "b")'); // It returns `Object {error: null, result: 14}`

console.log(res);

function getTax(payload) {
  if(payload.taxType === 'IVA') {
    return {value: 0.16};
  }
  if(payload.taxType === 'RET_IVA') {
    return {value: 0.167};
  }
}

module.exports = getTax
