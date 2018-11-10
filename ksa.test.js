const getTax = require('./index');

describe('KSA VAT', () => {
  describe('DRUG', () => {
    test('TAXYES >2000', () => {
      const o = {
        country: 'KSA',
        taxType: 'VAT',
        category: 'DRUG',
        partnerTaxType: 'TAXYES',
        subTotal: 2001
      };

      expect(getTax(o)).toEqual(
        expect.objectContaining({
          result: 0.02
        })
      );
    });

    test('TAXYES <=2000', () => {
    });
  });
});

