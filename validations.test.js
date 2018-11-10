const getTax = require('./index');

describe('Validations', () => {
  test('No country for old men', () => {
    const o = {
      country: undefined
    };

    expect(getTax(o)).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });

  test('Neverland', () => {
    const o = {
      country: 'NEVERLAND'
    };

    expect(getTax(o)).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});
