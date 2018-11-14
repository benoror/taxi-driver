const { salesTax } = require('../../getTax');

describe('Argentina', () => {
  describe('Inscripto', () => {
    test('>7120', () => {
      const q = {
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          subTotal: 7121
        }
      };

      expect(salesTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 0.06
        })
      );
    });
    salesTax
    test('<=7120', () => {
      const q = {
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          subTotal: 7120
        }
      };

      expect(salesTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });

  describe('No Inscripto', () => {
    test('>7120', () => {
      const q = {
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'NO_INSCRIPTO',
        vars: {
          subTotal: 7121
        }
      };

      expect(salesTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 0.25
        })
      );
    });

    test('<=7120', () => {
      const q = {
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'NO_INSCRIPTO',
        vars: {
          subTotal: 7120
        }
      };

      expect(salesTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });
});

