const { salesTax } = require('./getTax');

describe('Validations', () => {
  test('No country for old men', () => {
    expect(salesTax('neverland', {})).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });

  test('Not specific tax rules', () => {
    const o = {
      taxType: 'IVA',
      category: 'ALCOHOL'
    };

    expect(salesTax('mx', o)).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });

  // test('Double deathmatch', () => {
  // ToDo: Mock db.json
  // });
});
