const { getTaxes } = require('../../getTax');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const q = {
        country: "MX",
        txType: "sales",
        docType: "invoice",
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "IVA",
          rate: 0.16,
          factor: 0.16,
        }]
      });
    });

    test('Pharmacy Drug', () => {
      const q = {
        country: "MX",
        txType: "sales",
        docType: "invoice",
        category: 'DRUG',
        area: 'PHARMACY',
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "IVA",
          rate: 0,
          factor: 0,
        }]
      });
    });
  });

  describe('RET', () => {
    test('RET_IVA', () => {
      const q = {
        country: "MX",
        txType: "income",
        docType: "invoice",
        taxes: ["RET_IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "RET_IVA",
          rate: 0.167,
          factor: 0.167,
        }]
      });
    });

    test('RET_ISR', () => {
      const q = {
        country: "MX",
        txType: "income",
        docType: "invoice",
        taxes: ["RET_ISR"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "RET_ISR",
          rate: 0.1,
          factor: 0.1,
        }]
      });
    });
  });

  describe('PAYROLL', () => {
    test('N.L.', () => {
      const q = {
        country: "MX",
        region: 'NL',
        txType: "income",
        category: 'NOMINA',
        taxes: ["PAYROLL"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "PAYROLL",
          rate: 0.02,
          factor: 0.02,
        }]
      });
    });

    test('D.F.', () => {
      const q = {
        country: "MX",
        region: 'DF',
        txType: "income",
        category: 'NOMINA',
        taxes: ["PAYROLL"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: "PAYROLL",
          rate: 0.03,
          factor: 0.03,
        }]
      });
    });
  });

  describe('Multi Taxes', () => {
    test('With dependant whitholding (RET_IVA)', () => {
      const q = {
        country: "MX",
        region: 'AGS',
        docType: 'ARI',
        txType: "sales",
        bpType: "signed",
        area: 'PHARMACY',
        category: 'DRUG',
        vars: {
          subTotal: 1000
        },
        taxes: [ 'IVA', 'ISR', 'RET_IVA' ],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 1000,
        taxTotal: 268,
        grandTotal: 1268,
        taxes: [{
          error: null,
          name: 'IVA',
          rate: 0.16,
          factor: 0.16,
          amount: 160,
        }, {
          error: null,
          name: 'ISR',
          rate: 0.10,
          factor: 0.10,
          amount: 100,
        }, {
          error: null,
          name: 'RET_IVA',
          rate: 0.05,
          factor: 0.008,
          amount: 8,
        }]
      });
    });

    test.skip('Based on vars (IEPS)', () => {
      const q = {
        country: "MX",
        region: 'AGS',
        docType: 'ARI',
        txType: "sales",
        bpType: "signed",
        area: 'PHARMACY',
        category: 'DRUG',
        taxes: [ 'IVA', 'IEPS' ],
      };

      expect(getTaxes(q)).toEqual({
        taxes: [{
          error: null,
          name: 'IVA',
          rate: 0.16,
          factor: 0.16
        }, {
          error: null,
          name: 'IEPS',
          rate: 0.05,
          factor: 0.05
        }]
      });
    });
  });
});

