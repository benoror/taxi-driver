const { getTaxes } = require('../../lib')

describe('Argentina - Go-live Dic 2018', () => {
  test('IVA10_5', () => {
    const q = {
      country: 'ar',
      vars: {
        unitPrice: '130',
        quantity: '2',
        subTotal: '260'
      },
      taxes: ['IVA10_5']
    }

    expect(getTaxes(q)).toEqual({
      subTotal: 260,
      taxTotal: 27.30,
      grandTotal: 287.30,
      taxes: {
        'IVA10_5': {
          rate: { error: null, result: 0.105 },
          factor: { error: null, result: 0.105 },
          amount: { error: null, result: 27.30 }
        }
      }
    })
  })

  test('IVA10_05', () => {
    const q = {
      country: 'AR',
      region: 'Entre Ríos',
      txType: 'sales',
      taxes: ['IVA10_5'],
      vars: {
        unitPrice: 0,
        subTotal: 0
      }
    }

    expect(getTaxes(q)).toEqual({
      subTotal: 0,
      taxTotal: 0,
      grandTotal: 0,
      taxes: {
        'IVA10_5': {
          rate: { error: null, result: 0.105 },
          factor: { error: null, result: 0.105 },
          amount: { error: null, result: 0 }
        }
      }
    })
  })

  test('IVA21', () => {
    const q = {
      country: 'ar',
      vars: {
        unitPrice: '27',
        quantity: '8',
        subTotal: '216'
      },
      taxes: ['IVA21']
    }

    expect(getTaxes(q)).toEqual({
      subTotal: 216,
      taxTotal: 45.36,
      grandTotal: 261.36,
      taxes: {
        'IVA21': {
          rate: { error: null, result: 0.21 },
          factor: { error: null, result: 0.21 },
          amount: { error: null, result: 45.36 }
        }
      }
    })
  })

  test('IVA27', () => {
    const q = {
      country: 'ar',
      vars: {
        unitPrice: '48',
        quantity: '7',
        subTotal: '336'
      },
      taxes: ['IVA27']
    }

    expect(getTaxes(q)).toEqual({
      subTotal: 336,
      taxTotal: 90.72,
      grandTotal: 426.72,
      taxes: {
        'IVA27': {
          rate: { error: null, result: 0.27 },
          factor: { error: null, result: 0.27 },
          amount: { error: null, result: 90.72 }
        }
      }
    })
  })

  test('IVA_E', () => {
    const q = {
      country: 'ar',
      vars: {
        unitPrice: '123',
        quantity: '5',
        subTotal: '615'
      },
      taxes: ['IVA_E']
    }

    expect(getTaxes(q)).toEqual({
      subTotal: 615,
      taxTotal: 0,
      grandTotal: 615,
      taxes: {
        'IVA_E': {
          rate: { error: null, result: 0.0 },
          factor: { error: null, result: 0.0 },
          amount: { error: null, result: 0.00 },
          meta: { exempt: true }
        }
      }
    })
  })

  test('Exento', () => {
    const q = {
      country: 'ar',
      vars: {
        unitPrice: '123',
        quantity: '5',
        subTotal: '615'
      },
      taxes: ['Exento']
    }

    expect(getTaxes(q)).toEqual({
      subTotal: 615,
      taxTotal: 0,
      grandTotal: 615,
      taxes: {
        'Exento': {
          rate: { error: null, result: 0.0 },
          factor: { error: null, result: 0.0 },
          amount: { error: null, result: 0.00 },
          meta: { exempt: true }
        }
      }
    })
  })

  test('Monotributo', () => {
    const q = {
      country: 'ar',
      vars: {
        unitPrice: '123',
        quantity: '5',
        subTotal: '615'
      },
      taxes: ['Monotributo']
    }

    expect(getTaxes(q)).toEqual({
      subTotal: 615,
      taxTotal: 0,
      grandTotal: 615,
      taxes: {
        'Monotributo': {
          rate: { error: null, result: 0.0 },
          factor: { error: null, result: 0.0 },
          amount: { error: null, result: 0.00 }
        }
      }
    })
  })

  test('Standard', () => {
    const q = {
      country: 'ar',
      vars: {
        unitPrice: '123',
        quantity: '5',
        subTotal: '615'
      },
      taxes: ['Standard']
    }

    expect(getTaxes(q)).toEqual({
      subTotal: 615,
      taxTotal: 98.4,
      grandTotal: 713.4,
      taxes: {
        'Standard': {
          rate: { error: null, result: 0.16 },
          factor: { error: null, result: 0.16 },
          amount: { error: null, result: 98.4 }
        }
      }
    })
  })
})
