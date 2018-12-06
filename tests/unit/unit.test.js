const { applyRules } = require('../../lib');
const FormulaParser = require('hot-formula-parser').Parser;
const parser = new FormulaParser();

describe('Applying rules', () => {

  test('Valid date', () => {
    const r = [{
      "validUntil": "2999-04-23T18:25:43.511Z",
      "rate": "1",
      "taxName": "IVA"
    }];
    const q = {
      taxes: ['IVA']
    };
    expect(applyRules(parser, r, q)). toEqual({
      'IVA': {
        rate: {
          error: null,
          result: 1
        },
      }
    });
  });

  test('Invalid date', () => {
    const r = [{
      "validUntil": "2012-04-23T18:25:43.511Z"
    }];
    const q = {
      taxType: 'IVA'
    };
    expect(() => applyRules(parser, r, q)).toThrowError();
  });

});
