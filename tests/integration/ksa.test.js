const { getTax } = require('../../getTax');

describe('KSA VAT', () => {
  describe('DRUG', () => {
    test('TAXYES >2000', () => {
      const q = {
        country: "sa",
        txType: "sales",
        docType: "invoice",
        taxName: 'VAT',
        category: 'DRUG',
        bpTaxType: 'TAXYES',
        vars: {
          productTotal: '2001'
        }
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.02
        })
      );
    });

    test('TAXYES <=2000', () => {
      const q = {
        country: "sa",
        txType: "sales",
        docType: "invoice",
        taxName: 'VAT',
        category: 'DRUG',
        bpTaxType: 'TAXYES',
        vars: {
          productTotal: '2000'
        }
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.05
        })
      );
    });

    test('!TAXYES', () => {
      const q = {
        country: "sa",
        txType: "sales",
        docType: "invoice",
        taxName: 'VAT',
        category: 'DRUG',
        bpTaxType: '!TAXYES'
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.0
        })
      );
    });
  });

  describe('Not DRUG', () => {
    test('TAXYES >5000', () => {
      const q = {
        country: "sa",
        txType: "sales",
        docType: "invoice",
        taxName: 'VAT',
        category: '!DRUG',
        bpTaxType: 'TAXYES',
        vars: {
          productTotal: '5001'
        }
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.05
        })
      );
    });

    test('TAXYES <=5000', () => {
      const q = {
        country: "sa",
        txType: "sales",
        docType: "invoice",
        taxName: 'VAT',
        category: '!DRUG',
        bpTaxType: 'TAXYES',
        vars: {
          productTotal: '5000'
        }
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.04
        })
      );
    });
  });
});

