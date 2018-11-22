const { getTax } = require('../../getTax');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const q = {
        country: "MX",
        txType: "sales",
        docType: "invoice",
        taxName: 'IVA'
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.16
        })
      );
    });

    test('Pharmacy Drug', () => {
      const q = {
        country: "MX",
        txType: "sales",
        docType: "invoice",
        taxName: 'IVA',
        category: 'DRUG',
        area: 'PHARMACY'
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });

  describe('RET', () => {
    test('RET_IVA', () => {
      const q = {
        country: "MX",
        txType: "income",
        docType: "invoice",
        taxName: 'RET_IVA'
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.167
        })
      );
    });

    test('RET_ISR', () => {
      const q = {
        country: "MX",
        txType: "income",
        docType: "invoice",
        taxName: 'RET_ISR'
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.1
        })
      );
    });
  });

  describe('PAYROLL', () => {
    test('N.L.', () => {
      const q = {
        country: "MX",
        txType: "income",
        taxName: 'PAYROLL',
        category: 'NOMINA',
        region: 'NL'
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.02
        })
      );
    });

    test('D.F.', () => {
      const q = {
        country: "MX",
        txType: "income",
        taxName: 'PAYROLL',
        category: 'NOMINA',
        region: 'DF'
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.03
        })
      );
    });
  });
});

