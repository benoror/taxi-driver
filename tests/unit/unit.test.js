const { applyRules } = require('../../getTax');

describe('Applying rules', () => {

  test('Valid date', () => {
    const r = [{
      "validUntil": "2999-04-23T18:25:43.511Z",
      "formula": "1",
      "taxName": "IVA"
    }];
    const q = {
      taxes: [{ name: 'IVA' }]
    };
    expect(applyRules(r, q)). toEqual([{
      error: null,
      name: 'IVA',
      rate: 1,
    }]);
  });

  test('Invalid date', () => {
    const r = [{
      "validUntil": "2012-04-23T18:25:43.511Z"
    }];
    const q = {
      taxType: 'IVA'
    };
    expect(() => applyRules(r, q)).toThrowError();
  });

});
