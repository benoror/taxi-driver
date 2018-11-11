const { salesTax } = require('./getTax');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const o = {
        taxType: 'IVA'
      };

      expect(salesTax('mx', o)).toEqual(
        expect.objectContaining({
          result: 0.16
        })
      );
    });

    test('Pharmacy Drug', () => {
      const o = {
        taxType: 'IVA',
        category: 'DRUG',
        area: 'PHARMACY'
      };

      expect(salesTax('mx', o)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });

  test('RET_IVA', () => {
    const o = {
      taxType: 'RET_IVA'
    };

    expect(salesTax('mx', o)).toEqual(
      expect.objectContaining({
        result: 0.167
      })
    );
  });

  test('RET_ISR', () => {
    const o = {
      taxType: 'RET_ISR'
    };

    expect(salesTax('mx', o)).toEqual(
      expect.objectContaining({
        result: 0.1
      })
    );
  });
});

