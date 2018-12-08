const {
  calculateFactors,
  calculateAmounts,
  calculateTotals
} = require('./calc')
const FormulaParser = require('hot-formula-parser').Parser
let parser

describe('Factors', () => {
  test('Factor equals rate', () => {
    const t = {
      'IVA': {
        rate: { error: null, result: 0.16 }
      }
    }
    const r = [{ taxName: 'IVA' }]
    expect(calculateFactors(t, r)).toEqual({
      'IVA': {
        rate: { error: null, result: 0.16 },
        factor: { error: null, result: 0.16 }
      }
    })
  })

  test('Factors for dependant Taxes', () => {
    const t = {
      'VAT': {
        rate: { error: null, result: 0.15 }
      },
      'WHIT': {
        rate: { error: null, result: 0.50 }
      }
    }
    const r = [
      { taxName: 'VAT' },
      { taxName: 'WHIT', dep: 'VAT' }
    ]
    expect(calculateFactors(t, r)).toEqual({
      'VAT': {
        rate: { error: null, result: 0.15 },
        factor: { error: null, result: 0.15 }
      },
      'WHIT': {
        rate: { error: null, result: 0.50 },
        factor: { error: null, result: 0.075 }
      }
    })
  })
})

describe('Amounts', () => {
  beforeEach(() => {
    parser = new FormulaParser()
  })

  test('Calculate when having subTotal', () => {
    parser.setVariable('subTotal', 280)
    const t = {
      'VAT': {
        rate: { error: null, result: 0.15 },
        factor: { error: null, result: 0.15 }
      }
    }
    expect(calculateAmounts(parser, t)).toEqual({
      'VAT': {
        rate: { error: null, result: 0.15 },
        factor: { error: null, result: 0.15 },
        amount: { error: null, result: 42 }
      }
    })
  })

  test('Don\' re-calculate when already having amount', () => {
    const t = {
      'VAT': {
        rate: { error: null, result: 0.15 },
        factor: { error: null, result: 0.15 },
        amount: { error: null, result: 15 }
      }
    }
    expect(calculateAmounts(parser, t)).toEqual(t)
  })
})

describe('Totals', () => {
  beforeEach(() => {
    parser = new FormulaParser()
  })

  test('Calculate when having subTotal', () => {
    parser.setVariable('subTotal', 280)
    const t = {
      'VAT': {
        rate: { error: null, result: 0.15 },
        factor: { error: null, result: 0.15 },
        amount: { error: null, result: 42 }
      }
    }
    expect(calculateTotals(parser, t)).toEqual({
      subTotal: 280,
      taxTotal: 42,
      grandTotal: 322,
      taxes: {
        'VAT': {
          rate: { error: null, result: 0.15 },
          factor: { error: null, result: 0.15 },
          amount: { error: null, result: 42 }
        }
      }
    })
  })
})
