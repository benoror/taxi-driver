const { getTaxes } = require('../../getTax');

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
          productTotal: '10701'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "IVA",
          rate: 10701*0.12, // 1284.12,
          factor: 10701*0.12 // 1284.12,
        }]
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
          productTotal: '19999'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "IVA",
          rate: 19999*0.15, // 2,999.85,
          factor: 19999*0.15 // 2,999.85,
        }]
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
          productTotal: '60000'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "IVA",
          rate: 60000*0.27, // 16,200,
          factor: 60000*0.27 // 16,200,
        }]
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
          productTotal: '10700'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "IVA",
          rate: 10700*0.06, // 642,
          factor: 10700*0.06 // 642,
        }]
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
          productTotal: '10701'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "IVA",
          rate: 10701*0.28, // 2996.28,
          factor: 10701*0.28 // 2996.28,
        }]
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
          productTotal: '600'
        },
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "IVA",
          rate: 150,
          factor: 150,
        }]
      });
    });
  });
});

