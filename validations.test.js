const { salesTax } = require('./getTax');

describe('Validations', () => {
  test('No country for old men', () => {
    expect(() => salesTax('neverland', {})).toThrowError();
  });

  test('Not specific tax rules', () => {
    const o = {
      taxType: 'IVA',
      category: 'ALCOHOL'
    };

    expect(() => salesTax('mx', o)).toThrowError();
  });

  // test('Double deathmatch', () => {
  // ToDo: Mock db.json
  // });
});
