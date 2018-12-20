const { getTaxes } = require('../../lib')

describe('Saudi Arabia - Go-live Dic 2018', () => {
  describe('DRUG', () => {
    test('TAXYES <=2000', () => {
      const q = {
        country: 'sa',
        txType: 'SALES',
        docType: 'invoice',
        taxes: ['VAT'],
        category: 'DRUG',
        bpType: 'TAXYES',
        vars: {
          unitPrice: '998',
          quantity: 4,
          subTotal: 3992
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 3992,
        taxTotal: 199.60,
        grandTotal: 4191.60,
        taxes: {
          'VAT': {
            rate: { error: null, result: 0.05 },
            factor: { error: null, result: 0.05 },
            amount: { error: null, result: 199.60 }
          }
        }
      })
    })

    test('!TAXYES', () => {
      const q = {
        country: 'sa',
        txType: 'SALES',
        docType: 'invoice',
        taxes: ['VAT'],
        category: 'DRUG',
        bpType: '!TAXYES',
        vars: {
          unitPrice: '696.41',
          quantity: 6,
          subTotal: 4178.46
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 4178.46,
        taxTotal: 0,
        grandTotal: 4178.46,
        taxes: {
          'VAT': {
            rate: { error: null, result: 0 },
            factor: { error: null, result: 0 },
            amount: { error: null, result: 0 }
          }
        }
      })
    })
  })

  describe('Not DRUG', () => {
    test('TAXYES <=5000', () => {
      const q = {
        country: 'sa',
        txType: 'SALES',
        docType: 'invoice',
        taxes: ['VAT'],
        category: '!DRUG',
        bpType: 'TAXYES',
        vars: {
          unitPrice: '595',
          quantity: 5,
          subTotal: 2975
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 2975,
        taxTotal: 119.00,
        grandTotal: 3094.00,
        taxes: {
          'VAT': {
            rate: { error: null, result: 0.04 },
            factor: { error: null, result: 0.04 },
            amount: { error: null, result: 119.00 }
          }
        }
      })
    })

    test('!TAXYES', () => {
      const q = {
        country: 'sa',
        txType: 'SALES',
        docType: 'invoice',
        taxes: ['VAT'],
        category: '!DRUG',
        bpType: '!TAXYES',
        vars: {
          unitPrice: '337.48',
          quantity: 4,
          subTotal: 1349.92
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 1349.92,
        taxTotal: 0,
        grandTotal: 1349.92,
        taxes: {
          'VAT': {
            rate: { error: null, result: 0.0 },
            factor: { error: null, result: 0.0 },
            amount: { error: null, result: 0 }
          }
        }
      })
    })
  })
})
