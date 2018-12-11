const { getTaxes } = require('../../lib')

describe('KSA VAT', () => {
  describe('DRUG', () => {
    test('TAXYES >2000', () => {
      const q = {
        country: 'sa',
        txType: 'SALES',
        docType: 'invoice',
        taxes: ['VAT'],
        category: 'DRUG',
        bpType: 'TAXYES',
        vars: {
          unitPrice: '2001'
        }
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'VAT': {
            rate: { error: null, result: 0.02 },
            factor: { error: null, result: 0.02 }
          }
        }
      })
    })

    test('TAXYES <=2000', () => {
      const q = {
        country: 'sa',
        txType: 'SALES',
        docType: 'invoice',
        taxes: ['VAT'],
        category: 'DRUG',
        bpType: 'TAXYES',
        vars: {
          unitPrice: '2000'
        }
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'VAT': {
            rate: { error: null, result: 0.05 },
            factor: { error: null, result: 0.05 }
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
        bpType: '!TAXYES'
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'VAT': {
            rate: { error: null, result: 0.0 },
            factor: { error: null, result: 0.0 }
          }
        }
      })
    })
  })

  describe('Not DRUG', () => {
    test('TAXYES >5000', () => {
      const q = {
        country: 'sa',
        txType: 'SALES',
        docType: 'invoice',
        taxes: ['VAT'],
        category: '!DRUG',
        bpType: 'TAXYES',
        vars: {
          unitPrice: '5001'
        }
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'VAT': {
            rate: { error: null, result: 0.05 },
            factor: { error: null, result: 0.05 }
          }
        }
      })
    })

    test('TAXYES <=5000', () => {
      const q = {
        country: 'sa',
        txType: 'SALES',
        docType: 'invoice',
        taxes: ['VAT'],
        category: '!DRUG',
        bpType: 'TAXYES',
        vars: {
          unitPrice: '5000'
        }
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'VAT': {
            rate: { error: null, result: 0.04 },
            factor: { error: null, result: 0.04 }
          }
        }
      })
    })
  })
})
