const { getTax } = require('../../getTax');

describe('Validations', () => {
  test('No country for old men', () => {
    expect(() => getTax('neverland', {})).toThrowError();
  });

  test('Not specific tax rules', () => {
    const q = {
      taxType: 'IVA',
      category: 'ALCOHOL'
    };

    expect(() => getTax('mx', q)).toThrowError();
  });

  test('Double deathmatch', () => {
    const q = {
      taxType: 'VAT'
    };

    expect(() => getTax('sa', q)).toThrowError();
  });
});
