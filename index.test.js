const getTax = require('./index');

test('MEXICO IVA', () => {
  const o = {
    country: 'MX',
    taxType: 'IVA'
  };

  expect(getTax(o)).toBe(0.16);
});

