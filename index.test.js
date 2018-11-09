const getTax = require('./index');


describe('MEXICO', () => {
  test('IVA', () => {
    const o = {
      country: 'MX',
      taxType: 'IVA'
    };

    expect(getTax(o)).toBe(0.16);
  });
});

