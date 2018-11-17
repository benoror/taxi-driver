const { getTax } = require('../../getTax');

describe('Argentina', () => {
  describe('Inscripto', () => {
    test('>10700', () => {
      const q = {
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          productTotal: '10701'
        }
      };

      expect(getTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 1284.12
        })
      );
    });

    test('<=10700', () => {
      const q = {
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          productTotal: '10700'
        }
      };

      expect(getTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 642
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
          productTotal: '10701'
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
          productTotal: '600'
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

