const { salesTax } = require('../../getTax');

describe('Validations', () => {
  test('No country for old men', () => {
    expect(() => salesTax('neverland', {})).toThrowError();
  });

  test('Not specific tax rules', () => {
    const q = {
      taxType: 'IVA',
      category: 'ALCOHOL'
    };

    expect(() => salesTax('mx', q)).toThrowError();
  });

  test('Double deathmatch', () => {
    const q = {
      taxType: 'VAT'
    };

    expect(() => salesTax('sa', q)).toThrowError();
  });
});
