const Currency = require('currency.js')
const { getTaxes } = require('../../lib')
const { FACTOR_PRECISION } = require('../../lib/calc')

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const q = {
        country: 'MX',
        txType: 'sales',
        taxes: ['IVA']
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.16 },
            factor: { error: null, result: 0.16 }
          }
        }
      })
    })

    test('[Cirrus Legacy] Sales Rate 0 (Drug)', () => {
      const q = {
        country: 'MX',
        txType: 'sales',
        docType: 'invoice',
        category: '51000000',
        taxes: ['IVA0']
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'IVA0': {
            rate: { error: null, result: 0 },
            factor: { error: null, result: 0 }
          }
        }
      })
    })

    test('[exempt] Income Rate 0 (Drug)', () => {
      const q = {
        country: 'MX',
        txType: 'income',
        category: '51000000',
        area: 'e',
        taxes: ['IVA']
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'IVA': {
            rate: { error: null, result: 0 },
            factor: { error: null, result: 0 },
            meta: { exempt: true }
          }
        }
      })
    })

    test('Best Match (region non-existent)', () => {
      const q = {
        country: 'MX',
        region: 'OAX',
        txType: 'sales',
        docType: 'invoice',
        taxes: ['IVA']
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.16 },
            factor: { error: null, result: 0.16 }
          }
        }
      })
    })
  })

  describe('RET', () => {
    test('RETIVA', () => {
      const q = {
        country: 'MX',
        txType: 'sales',
        docType: 'invoice',
        taxes: ['RETIVA']
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'RETIVA': {
            rate: { error: null, result: -2 / 3 },
            factor: { error: null, result: -2 / 3 }
          }
        }
      })
    })

    test('RETISR', () => {
      const q = {
        country: 'MX',
        txType: 'sales',
        docType: 'invoice',
        taxes: ['RETISR']
      }

      expect(getTaxes(q)).toEqual({
        taxes: {
          'RETISR': {
            rate: { error: null, result: -0.1 },
            factor: { error: null, result: -0.1 }
          }
        }
      })
    })
  })

  describe('PAYROLL', () => {
    // test('N.L.', () => {
    //   const q = {
    //     country: 'MX',
    //     region: 'NL',
    //     txType: 'income',
    //     category: 'NOMINA',
    //     taxes: ['PAYROLL']
    //   }

    //   expect(getTaxes(q)).toEqual({
    //     taxes: {
    //       'PAYROLL': {
    //         rate: { error: null, result: 0.02 },
    //         factor: { error: null, result: 0.02 }
    //       }
    //     }
    //   })
    // })

    // test('D.F.', () => {
    //   const q = {
    //     country: 'MX',
    //     region: 'DF',
    //     txType: 'income',
    //     category: 'NOMINA',
    //     taxes: ['PAYROLL']
    //   }

    //   expect(getTaxes(q)).toEqual({
    //     taxes: {
    //       'PAYROLL': {
    //         rate: { error: null, result: 0.03 },
    //         factor: { error: null, result: 0.03 }
    //       }
    //     }
    //   })
    // })
  })

  describe('Multi Taxes', () => {
    // https://www.elcontribuyente.mx/calculadora/honorarios/
    test('With dependant whitholding (RETIVA)', () => {
      const q = {
        country: 'MX',
        txType: 'sales',
        area: 'e',
        category: '51000000',
        vars: {
          subTotal: 1000
        },
        taxes: [ 'IVA', 'RETISR', 'RETIVA' ]
      }

      expect(getTaxes(q)).toEqual({
        subTotal: 1000,
        taxTotal: -100,
        grandTotal: 900,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0 },
            factor: { error: null, result: 0 },
            amount: { error: null, result: 0 },
            meta: { exempt: true }
          },
          'RETISR': {
            rate: { error: null, result: -0.10 },
            factor: { error: null, result: -0.10 },
            amount: { error: null, result: -100 }
          },
          'RETIVA': {
            rate: {
              error: null,
              result: -2 / 3
            },
            factor: {
              error: null,
              result: Currency(0 * (2 / 3), { precision: FACTOR_PRECISION }).value
            },
            amount: { error: null, result: 0 }
          }
        }
      })
    })

    // test('Energy Drinks (IVA+IEPS)', () => {
    //   const q = {
    //     country: 'MX',
    //     txType: 'sales',
    //     category: 'SOFT_DRINKS',
    //     vars: {
    //       quantity: 3,
    //       subTotal: 30
    //     },
    //     taxes: [ 'IVA', 'IEPS' ]
    //   }

    //   expect(getTaxes(q)).toEqual({
    //     subTotal: 30,
    //     taxTotal: 7.8,
    //     grandTotal: 37.8,
    //     taxes: {
    //       'IVA': {
    //         rate: { error: null, result: 0.16 },
    //         factor: { error: null, result: 0.16 },
    //         amount: { error: null, result: 4.8 }
    //       },
    //       'IEPS': {
    //         amount: { error: null, result: 3 }
    //       }
    //     }
    //   })
    // })
  })

  describe('IEPS', () => {
    // test('Candy > 100g', () => {
    //   const q = {
    //     country: 'MX',
    //     txType: 'sales',
    //     category: 'CANDY',
    //     vars: {
    //       quantity: '101'
    //     },
    //     taxes: [ 'IEPS' ]
    //   }

    //   expect(getTaxes(q)).toEqual({
    //     taxes: {
    //       'IEPS': {
    //         rate: { error: null, result: 0.08 },
    //         factor: { error: null, result: 0.08 }
    //       }
    //     }
    //   })
    // })

    // test('Candy <= 100g', () => {
    //   const q = {
    //     country: 'MX',
    //     txType: 'sales',
    //     category: 'CANDY',
    //     vars: {
    //       quantity: 99
    //     },
    //     taxes: [ 'IEPS' ]
    //   }

    //   expect(getTaxes(q)).toEqual({
    //     taxes: {
    //       'IEPS': {
    //         rate: { error: null, result: 0.0 },
    //         factor: { error: null, result: 0.0 }
    //       }
    //     }
    //   })
    // })

    // test('Energy Drinks', () => {
    //   const q = {
    //     country: 'MX',
    //     txType: 'sales',
    //     category: 'ENERGY_DRINKS',
    //     taxes: [ 'IEPS' ]
    //   }

    //   expect(getTaxes(q)).toEqual({
    //     taxes: {
    //       'IEPS': {
    //         rate: { error: null, result: 0.25 },
    //         factor: { error: null, result: 0.25 }
    //       }
    //     }
    //   })
    // })

    // test('Soft Drinks', () => {
    //   const q = {
    //     country: 'MX',
    //     txType: 'sales',
    //     category: 'SOFT_DRINKS',
    //     vars: {
    //       quantity: 3,
    //       subTotal: 30
    //     },
    //     taxes: [ 'IEPS' ]
    //   }

    //   expect(getTaxes(q)).toEqual({
    //     subTotal: 30,
    //     taxTotal: 3,
    //     grandTotal: 33,
    //     taxes: {
    //       'IEPS': {
    //         amount: { error: null, result: 3 }
    //       }
    //     }
    //   })
    // })
  })
})
