const getTax = require('./index');


describe('MEXICO', () => {
  test('IVA', () => {
    const o = {
      country: 'MX',
      taxType: 'IVA'
    };

    expect(getTax(o)).toEqual(
      expect.objectContaining({
        value: 0.16
      })
    );
  });

  test('RET_IVA', () => {
    const o = {
      country: 'MX',
      taxType: 'RET_IVA'
    };

    expect(getTax(o)).toEqual(
      expect.objectContaining({
        value: 0.167
      })
    );
  });
});

