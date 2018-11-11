const getTax = require('./index');

describe('Argentina', () => {
  describe('Inscripto', () => {
    test('>7120', () => {
      const o = {
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          subTotal: 7121
        }
      };

      expect(getTax('ar', o)).toEqual(
        expect.objectContaining({
          result: 0.06
        })
      );
    });

    test('<=7120', () => {
      const o = {
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'INSCRIPTO',
        vars: {
          subTotal: 7120
        }
      };

      expect(getTax('ar', o)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });

  describe('No Inscripto', () => {
    test('>7120', () => {
      const o = {
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'NO_INSCRIPTO',
        vars: {
          subTotal: 7121
        }
      };

      expect(getTax('ar', o)).toEqual(
        expect.objectContaining({
          result: 0.25
        })
      );
    });

    test('<=7120', () => {
      const o = {
        category: 'ALQUILERES_RURAL',
        bpTaxType: 'NO_INSCRIPTO',
        vars: {
          subTotal: 7120
        }
      };

      expect(getTax('ar', o)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });
});

