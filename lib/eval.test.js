const { evalRules, parseFormulaOrNumber } = require('./eval')
const FormulaParser = require('hot-formula-parser').Parser
let parser

beforeEach(() => {
  parser = new FormulaParser()
})

describe('Dates', () => {
  test('Valid from', () => {
    const r = [{
      'validFrom': '1999-04-23T18:25:43.511Z',
      'rate': '1',
      'taxName': 'IVA'
    }]
    const q = {
      taxes: ['IVA']
    }
    expect(evalRules(parser, r, q)).toEqual({
      'IVA': { rate: { error: null, result: 1 } }
    })
  })

  test('Valid from in the future', () => {
    const r = [{
      'validFrom': '2999-04-23T18:25:43.511Z',
      'rate': '1',
      'taxName': 'IVA'
    }]
    const q = {
      taxType: 'IVA'
    }

    try {
      expect(evalRules(parser, r, q)).toThrowError()
    } catch (error) {
      expect(error.message).toMatch(/valid from/i)
      expect(error.statusCode).toEqual(400)
    }
  })

  test('Valid until', () => {
    const r = [{
      'validUntil': '2999-04-23T18:25:43.511Z',
      'rate': '1',
      'taxName': 'IVA'
    }]
    const q = {
      taxes: ['IVA']
    }
    expect(evalRules(parser, r, q)).toEqual({
      'IVA': { rate: { error: null, result: 1 } }
    })
  })

  test('Valid until in the past', () => {
    const r = [{
      'validUntil': '2012-04-23T18:25:43.511Z',
      'rate': '1',
      'taxName': 'IVA'
    }]
    const q = {
      taxType: 'IVA'
    }

    try {
      expect(evalRules(parser, r, q)).toThrowError()
    } catch (error) {
      expect(error.message).toMatch(/valid until/i)
      expect(error.statusCode).toEqual(400)
    }
  })
})

describe('Parse formulas or numbers', () => {
  test('Parse formula string', () => {
    const value = '(6*6)+6'
    expect(parseFormulaOrNumber(parser, value)).toEqual({
      error: null,
      result: 42
    })
  })

  test('Parse number', () => {
    const value = 42
    expect(parseFormulaOrNumber(parser, value)).toEqual({
      error: null,
      result: 42
    })
  })

  test('Parse error', () => {
    const value = ')*5'
    expect(parseFormulaOrNumber(parser, value)).toEqual({
      error: '#ERROR!',
      result: null
    })
  })

  test('Parse error when Boolean', () => {
    const value = false
    expect(parseFormulaOrNumber(parser, value)).toEqual({
      error: '#ERROR!',
      result: null
    })
  })
})
