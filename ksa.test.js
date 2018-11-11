const getTax = require('./index');

describe('KSA VAT', () => {
  describe('DRUG', () => {
    test('TAXYES >2000', () => {
      const o = {
        taxType: 'VAT',
        category: 'DRUG',
        bpTaxType: 'TAXYES',
        vars: {
          subTotal: 2001
        }
      };

      expect(getTax('sa', o)).toEqual(
        expect.objectContaining({
          result: 0.02
        })
      );
    });

    test('TAXYES <=2000', () => {
      const o = {
        taxType: 'VAT',
        category: 'DRUG',
        bpTaxType: 'TAXYES',
        vars: {
          subTotal: 2000
        }
      };

      expect(getTax('sa', o)).toEqual(
        expect.objectContaining({
          result: 0.05
        })
      );
    });

    test('!TAXYES', () => {
      const o = {
        taxType: 'VAT',
        category: 'DRUG',
        bpTaxType: '!TAXYES'
      };

      expect(getTax('sa', o)).toEqual(
        expect.objectContaining({
          result: 0.0
        })
      );
    });
  });

  describe('Not DRUG', () => {
    test('TAXYES >5000', () => {
      const o = {
        taxType: 'VAT',
        category: '!DRUG',
        bpTaxType: 'TAXYES',
        vars: {
          subTotal: 5001
        }
      };

      expect(getTax('sa', o)).toEqual(
        expect.objectContaining({
          result: 0.05
        })
      );
    });

    test('TAXYES <=5000', () => {
      const o = {
        taxType: 'VAT',
        category: '!DRUG',
        bpTaxType: 'TAXYES',
        vars: {
          subTotal: 5000
        }
      };

      expect(getTax('sa', o)).toEqual(
        expect.objectContaining({
          result: 0.04
        })
      );
    });
  });
});

