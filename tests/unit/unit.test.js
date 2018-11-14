const { applyRule } = require('../../getTax');

describe('Applying rules', () => {

  let r;

  beforeAll(() => {
    r = {
      "countryCode": "mx",
      "taxType": "IVA",
      "validUntil": "2012-04-23T18:25:43.511Z"
    };
  });

  test('Valid dates', () => {
    const q = {
      taxType: 'IVA'
    };
    expect(() => applyRule('mx', q)).toThrowError();
  });

});
