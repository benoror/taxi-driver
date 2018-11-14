const { getTax } = require('../../getTax');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const q = {
        txType: "sales",
        taxType: 'IVA'
      };

      expect(getTax('mx', q)).toEqual(
        expect.objectContaining({
          result: 0.16
        })
      );
    });

    test('Pharmacy Drug', () => {
      const q = {
        txType: "sales",
        taxType: 'IVA',
        category: 'DRUG',
        area: 'PHARMACY'
      };

      expect(getTax('mx', q)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });

  test('RET_IVA', () => {
    const q = {
      txType: "income",
      taxType: 'RET_IVA'
    };

    expect(getTax('mx', q)).toEqual(
      expect.objectContaining({
        result: 0.167
      })
    );
  });

  test('RET_ISR', () => {
    const q = {
      txType: "income",
      taxType: 'RET_ISR'
    };

    expect(getTax('mx', q)).toEqual(
      expect.objectContaining({
        result: 0.1
      })
    );
  });
});

