const { getTaxes } = require('../../lib')

describe('Mexico - Go-live Dic 2018', () => {
  describe('IVA(s)', () => {
    test('IVA (pre-2010)', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'income',
        area: 'i',
        date: '2003-08-04T00:00:00.511Z',
        vars: {
          unitPrice: 700.8,
          quantity: 4,
          subTotal: 2803.2
        },
        taxes: ['IVA']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 2803.2,
        taxTotal: 308.352,
        grandTotal: 3111.552,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.11 },
            factor: { error: null, result: 0.11 },
            amount: { error: null, result: 308.352 }
          }
        }
      })
    })

    test('IVA (post-2010)', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'income',
        area: 'i',
        date: '2014-11-16T00:00:00.511Z',
        vars: {
          unitPrice: 42.72,
          quantity: 4,
          subTotal: 170.88
        },
        taxes: ['IVA']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 170.88,
        taxTotal: 27.3408,
        grandTotal: 198.2208,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.16 },
            factor: { error: null, result: 0.16 },
            amount: { error: null, result: 27.3408 }
          }
        }
      })
    })

    test('IVA11', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'income',
        area: 'i',
        date: '2000-07-05T00:00:00.511Z',
        vars: {
          unitPrice: 351.33,
          quantity: 11,
          subTotal: 3864.63
        },
        taxes: ['IVA11']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 3864.63,
        taxTotal: 425.1093,
        grandTotal: 4289.7393,
        taxes: {
          'IVA11': {
            rate: { error: null, result: 0.11 },
            factor: { error: null, result: 0.11 },
            amount: { error: null, result: 425.1093 }
          }
        }
      })
    })

    test('IVA0 Sales', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        date: '2010-04-30T00:00:00.511Z',
        category: '51000000',
        vars: {
          unitPrice: 765.9,
          quantity: 13,
          subTotal: 9956.7
        },
        taxes: ['IVA0']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 9956.7,
        taxTotal: 0,
        grandTotal: 9956.7,
        taxes: {
          'IVA0': {
            rate: { error: null, result: 0.0 },
            factor: { error: null, result: 0.0 },
            amount: { error: null, result: 0 }
          }
        }
      })
    })

    test('IVA0 Income', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'income',
        area: '2',
        date: '2018-12-18T00:00:00.511Z',
        category: '51000000',
        vars: {
          unitPrice: 16,
          quantity: 3,
          subTotal: 48
        },
        taxes: ['IVA0']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 48,
        taxTotal: 0,
        grandTotal: 48,
        taxes: {
          'IVA0': {
            rate: { error: null, result: 0.0 },
            factor: { error: null, result: 0.0 },
            amount: { error: null, result: 0 }
          }
        }
      })
    })
  })

  describe('Misc', () => {
    test('A_SAL', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        date: '2011-04-24T00:00:00.511Z',
        vars: {
          unitPrice: 301.89,
          quantity: 12,
          subTotal: 3622.68
        },
        taxes: ['A_SAL']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 3622.68,
        taxTotal: 375.7262562,
        grandTotal: 3998.4062562,
        taxes: {
          'A_SAL': {
            rate: { error: null, result: 0.103715 },
            factor: { error: null, result: 0.103715 },
            amount: { error: null, result: 375.7262562 }
          }
        }
      })
    })

    test('ISH2', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        date: '2010-03-22T00:00:00.511Z',
        vars: {
          unitPrice: 898.75,
          quantity: 6,
          subTotal: 5392.5
        },
        taxes: ['ISH2']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 5392.5,
        taxTotal: 107.85,
        grandTotal: 5500.35,
        taxes: {
          'ISH2': {
            rate: { error: null, result: 0.02 },
            factor: { error: null, result: 0.02 },
            amount: { error: null, result: 107.85 }
          }
        }
      })
    })

    test('ISH3', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        date: '2012-03-11T00:00:00.511Z',
        vars: {
          unitPrice: 572.76,
          quantity: 14,
          subTotal: 8018.64
        },
        taxes: ['ISH3']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 8018.64,
        taxTotal: 240.5592,
        grandTotal: 8259.1992,
        taxes: {
          'ISH3': {
            rate: { error: null, result: 0.03 },
            factor: { error: null, result: 0.03 },
            amount: { error: null, result: 240.5592 }
          }
        }
      })
    })

    test('ISN3', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        date: '2017-01-30T00:00:00.511Z',
        vars: {
          unitPrice: 668.8,
          quantity: 17,
          subTotal: 11369.6
        },
        taxes: ['ISN3']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 11369.6,
        taxTotal: 341.088,
        grandTotal: 11710.688,
        taxes: {
          'ISN3': {
            rate: { error: null, result: 0.03 },
            factor: { error: null, result: 0.03 },
            amount: { error: null, result: 341.088 }
          }
        }
      })
    })

    test('ISN', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        date: '2012-08-13T00:00:00.511Z',
        vars: {
          unitPrice: 1128.6,
          quantity: 8,
          subTotal: 9028.8
        },
        taxes: ['ISN']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 9028.8,
        taxTotal: 270.864,
        grandTotal: 9299.664,
        taxes: {
          'ISN': {
            rate: { error: null, result: 0.03 },
            factor: { error: null, result: 0.03 },
            amount: { error: null, result: 270.864 }
          }
        }
      })
    })

    test('RTP3', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        date: '2012-08-21T00:00:00.511Z',
        vars: {
          unitPrice: 126.28,
          quantity: 1,
          subTotal: 126.28
        },
        taxes: ['RTP3']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 126.28,
        taxTotal: 3.7884,
        grandTotal: 130.0684,
        taxes: {
          'RTP3': {
            rate: { error: null, result: 0.03 },
            factor: { error: null, result: 0.03 },
            amount: { error: null, result: 3.7884 }
          }
        }
      })
    })

    test('DAP', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        vars: {
          unitPrice: 860.88,
          quantity: 14,
          subTotal: 12052.32
        },
        taxes: ['DAP']
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 12052.32,
        taxTotal: 1205.23079477,
        grandTotal: 13257.55079477,
        taxes: {
          'DAP': {
            rate: { error: null, result: 0.0999999 },
            factor: { error: null, result: 0.0999999 },
            amount: { error: null, result: 1205.23079477 }
          }
        }
      })
    })
  })

  describe('Whitholded', () => {
    test('RETIVA', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        taxes: ['RETIVA'],
        vars: {
          unitPrice: 1628.25,
          quantity: 17,
          subTotal: 27680.25
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 27680.25,
        taxTotal: -18453.50,
        grandTotal: 9226.75,
        taxes: {
          'RETIVA': {
            rate: { error: null, result: -2 / 3 },
            factor: { error: null, result: -2 / 3 },
            amount: { error: null, result: -18453.50 }
          }
        }
      })
    })

    test('RETISR', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        taxes: ['RETISR'],
        vars: {
          unitPrice: 140,
          quantity: 18,
          subTotal: 2520
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 2520,
        taxTotal: -252.00,
        grandTotal: 2268.00,
        taxes: {
          'RETISR': {
            rate: { error: null, result: -0.10 },
            factor: { error: null, result: -0.10 },
            amount: { error: null, result: -252.00 }
          }
        }
      })
    })

    test('RETIVA4', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        taxes: ['RETIVA4'],
        vars: {
          unitPrice: 982.73,
          quantity: 10,
          subTotal: 9827.3
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 9827.3,
        taxTotal: -393.092,
        grandTotal: 9434.208,
        taxes: {
          'RETIVA4': {
            rate: { error: null, result: -0.04 },
            factor: { error: null, result: -0.04 },
            amount: { error: null, result: -393.092 }
          }
        }
      })
    })
  })

  describe('IEPS*', () => {
    test('IEPS', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        category: '50000000',
        taxes: ['IEPS'],
        vars: {
          unitPrice: 751.68,
          quantity: 136,
          subTotal: 102228.48
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 102228.48,
        taxTotal: 8178.2784,
        grandTotal: 110406.7584,
        taxes: {
          'IEPS': {
            rate: { error: null, result: 0.08 },
            factor: { error: null, result: 0.08 },
            amount: { error: null, result: 8178.2784 }
          }
        }
      })
    })

    test('IEPS3', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        category: '50000000',
        taxes: ['IEPS3'],
        vars: {
          unitPrice: 706.86,
          quantity: 8,
          subTotal: 5654.88
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 5654.88,
        taxTotal: 169.6464,
        grandTotal: 5824.5264,
        taxes: {
          'IEPS3': {
            rate: { error: null, result: 0.03 },
            factor: { error: null, result: 0.03 },
            amount: { error: null, result: 169.6464 }
          }
        }
      })
    })

    test('IEPS8', () => {
      const q = {
        country: 'MX',
        region: 'NL',
        txType: 'sales',
        area: 'i',
        docType: 'e',
        category: '50000000',
        taxes: ['IEPS8'],
        vars: {
          unitPrice: 899.36,
          quantity: 12,
          subTotal: 10792.32
        }
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 10792.32,
        taxTotal: 863.3856,
        grandTotal: 11655.7056,
        taxes: {
          'IEPS8': {
            rate: { error: null, result: 0.08 },
            factor: { error: null, result: 0.08 },
            amount: { error: null, result: 863.3856 }
          }
        }
      })
    })
  })
})
