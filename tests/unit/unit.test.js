const { applyRules } = require('../../getTax');

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
    expect(applyRules(r, q)). toEqual({
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
    expect(() => applyRules(r, q)).toThrowError();
  });

});
