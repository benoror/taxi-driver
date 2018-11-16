const { getTax } = require('../../getTax');

describe('Argentina', () => {
  describe('Inscripto', () => {
    test('>7120', () => {
      const q = {
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          subTotal: 7121
        }
      };

      expect(getTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
    getTax
    test('<=7120', () => {
      const q = {
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          subTotal: 7120
        }
      };

      expect(getTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 150
        })
      );
    });
  });

  describe('No Inscripto', () => {
    test('>10700', () => {
      const q = {
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'NO_INSCRIPTO',
        vars: {
          subTotal: '10701'
        }
      };

      expect(getTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 2996.28
        })
      );
    });

    test('<=10700', () => {
      const q = {
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'NO_INSCRIPTO',
        vars: {
          subTotal: '600'
        }
      };

      expect(getTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 150
        })
      );
    });
  });
});

