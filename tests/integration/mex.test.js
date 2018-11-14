const { salesTax } = require('../../getTax');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const q = {
        taxType: 'IVA'
      };

      expect(salesTax('mx', q)).toEqual(
        expect.objectContaining({
          result: 0.16
        })
      );
    });

    test('Pharmacy Drug', () => {
      const q = {
        taxType: 'IVA',
        category: 'DRUG',
        area: 'PHARMACY'
      };

      expect(salesTax('mx', q)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });

  test('RET_IVA', () => {
    const q = {
      taxType: 'RET_IVA'
    };

    expect(salesTax('mx', q)).toEqual(
      expect.objectContaining({
        result: 0.167
      })
    );
  });

  test('RET_ISR', () => {
    const q = {
      taxType: 'RET_ISR'
    };

    expect(salesTax('mx', q)).toEqual(
      expect.objectContaining({
        result: 0.1
      })
    );
  });
});

