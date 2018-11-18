const { getTax } = require('../../getTax');

describe('Argentina', () => {
  describe('Inscripto', () => {
    test('>10700 <=15000', () => {
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
          result: 10701*0.12 // 1284.12
        })
      );
    });

    test('>15000 <=20000', () => {
      const q = {
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          productTotal: '19999'
        }
      };

      expect(getTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 19999*0.15 // 2,999.85
        })
      );
    });

    test('>40000 <=60000', () => {
      const q = {
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          productTotal: '60000'
        }
      };

      expect(getTax('ar', q)).toEqual(
        expect.objectContaining({
          result: 60000*0.27 // 16,200
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
          result: 10700*0.06 // 642
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
          result: 10701*0.28 // 2996.28
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

