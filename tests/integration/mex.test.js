const { getTax } = require('../../getTax');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const q = {
        txType: "sales",
        docType: "invoice",
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
        docType: "invoice",
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

  describe('RET', () => {
    test('RET_IVA', () => {
      const q = {
        txType: "income",
        docType: "invoice",
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
        docType: "invoice",
        taxType: 'RET_ISR'
      };

      expect(getTax('mx', q)).toEqual(
        expect.objectContaining({
          result: 0.1
        })
      );
    });
  });

  describe('PAYROLL', () => {
    test('N.L.', () => {
      const q = {
        txType: "income",
        taxType: 'PAYROLL',
        category: 'NOMINA',
        region: 'NL'
      };

      expect(getTax('mx', q)).toEqual(
        expect.objectContaining({
          result: 0.02
        })
      );
    });

    test('D.F.', () => {
      const q = {
        txType: "income",
        taxType: 'PAYROLL',
        category: 'NOMINA',
        region: 'DF'
      };

      expect(getTax('mx', q)).toEqual(
        expect.objectContaining({
          result: 0.03
        })
      );
    });
  });
});

