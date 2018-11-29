const { getTaxes } = require('../../lib');

describe('Argentina', () => {
  describe('Inscripto', () => {
    test('>10700 <=15000', () => {
      const q = {
        country: "ar",
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_rural',
        bpType: 'INSCRIPTO',
        vars: {
          subTotal: '10701'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 10701,
        taxTotal: 1284.12,
        grandTotal: 11985.12,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.12 },
            factor: { error: null, result: 0.12 },
            amount: { error: null, result: 1284.12 },
          }
        }
      });
    });

    test('>15000 <=20000', () => {
      const q = {
        country: "ar",
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_rural',
        bpType: 'INSCRIPTO',
        vars: {
          subTotal: '19999'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 19999,
        taxTotal: 2999.85,
        grandTotal: 22998.85,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.15 },
            factor: { error: null, result: 0.15 },
            amount: { error: null, result: 2999.85 },
          }
        }
      });
    });

    test('>40000 <=60000', () => {
      const q = {
        country: "ar",
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_rural',
        bpType: 'INSCRIPTO',
        vars: {
          subTotal: '60000'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 60000,
        taxTotal: 16200,
        grandTotal: 76200,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.27 },
            factor: { error: null, result: 0.27 },
            amount: { error: null, result: 16200 },
          }
        }
      });
    });

    test('<=10700', () => {
      const q = {
        country: "ar",
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_rural',
        bpType: 'INSCRIPTO',
        vars: {
          subTotal: '10700'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 10700,
        taxTotal: 642,
        grandTotal: 11342,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.06 },
            factor: { error: null, result: 0.06 },
            amount: { error: null, result: 642 },
          }
        }
      });
    });
  });

  describe('No Inscripto', () => {
    test('>10700', () => {
      const q = {
        country: "ar",
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_rural',
        bpType: 'NO_INSCRIPTO',
        vars: {
          subTotal: '10701'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 10701,
        taxTotal: 2996.28,
        grandTotal: 13697.28,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.28 },
            factor: { error: null, result: 0.28 },
            amount: { error: null, result: 2996.28 },
          }
        }
      });
    });

    test('<=10700', () => {
      const q = {
        country: "ar",
        txType: "sales",
        docType: "payment",
        category: 'ALQUILERES_rural',
        bpType: 'NO_INSCRIPTO',
        vars: {
          subTotal: '600'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 600,
        taxTotal: 150,
        grandTotal: 750,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.25 },
            factor: { error: null, result: 0.25 },
            amount: { error: null, result: 150 },
          }
        }
      });
    });
  });
});
