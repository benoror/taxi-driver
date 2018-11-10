const getTax = require('./index');

describe('Validations', () => {
  test('No country for old men', () => {
    expect(getTax('neverland', {})).toEqual(
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

    expect(getTax('mx', o)).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });

  // test('Double deathmatch', () => {
  // ToDo: Mock db.json
  // });
});
