const { getTaxes } = require('../../lib');

describe('Validations', () => {
  test('No country for old men', () => {
    expect(() => getTaxes('neverland', {})).toThrowError();
  });

  test('Not specific tax rules', () => {
    const q = {
      taxType: 'IVA',
      category: 'ALCOHOL'
    };

    expect(() => getTaxes('mx', q)).toThrowError();
  });

  test('Double deathmatch', () => {
    const q = {
      taxType: 'VAT'
    };

    expect(() => getTaxes('sa', q)).toThrowError();
  });
});
