const { applyRule } = require('../../getTax');

describe('Applying rules', () => {

  test('Valid date', () => {
    const r = {
      "validUntil": "2999-04-23T18:25:43.511Z",
      "formula": "1"
    };
    const q = {
      taxType: 'IVA'
    };
    expect(applyRule(r, q)). toEqual(
      expect.objectContaining({
        result: 1
      })
    );
  });

  test('Invalid date', () => {
    const r = {
      "validUntil": "2012-04-23T18:25:43.511Z"
    };
    const q = {
      taxType: 'IVA'
    };
    expect(() => applyRule(r, q)).toThrowError();
  });

});
