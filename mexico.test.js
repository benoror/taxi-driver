const getTax = require('./index');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const o = {
        taxType: 'IVA',
        category: '',
        area: '',
      };

      expect(getTax('mx', o)).toEqual(
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

      expect(getTax('mx', o)).toEqual(
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

    expect(getTax('mx', o)).toEqual(
      expect.objectContaining({
        result: 0.167
      })
    );
  });

  test('RET_ISR', () => {
    const o = {
      taxType: 'RET_ISR'
    };

    expect(getTax('mx', o)).toEqual(
      expect.objectContaining({
        result: 0.1
      })
    );
  });
});

