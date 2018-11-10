const getTax = require('./index');

describe('MEXICO', () => {
  describe('IVA', () => {
    test('IVA NORMAL', () => {
      const o = {
        country: 'MEX',
        taxType: 'IVA'
      };

      expect(getTax(o)).toEqual(
        expect.objectContaining({
          value: 0.16
        })
      );
    });

    test('IVA DRUG PHARMACY', () => {
      const o = {
        country: 'MEX',
        taxType: 'IVA',
        category: 'DRUG',
        area: 'PHARMACY'
      };

      expect(getTax(o)).toEqual(
        expect.objectContaining({
          value: 0
        })
      );
    });
  });

  test('RET_IVA', () => {
    const o = {
      country: 'MEX',
      taxType: 'RET_IVA'
    };

    expect(getTax(o)).toEqual(
      expect.objectContaining({
        value: 0.167
      })
    );
  });

  test('RET_ISR', () => {
    const o = {
      country: 'MEX',
      taxType: 'RET_ISR'
    };

    expect(getTax(o)).toEqual(
      expect.objectContaining({
        value: 0.1
      })
    );
  });
});
