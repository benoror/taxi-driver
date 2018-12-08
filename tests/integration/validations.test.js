const { getTaxes } = require('../../lib')

describe('Required Validations', () => {
  test('No country for old men', () => {
    const q = {
      country: 'neverland',
      taxes: ['XYZ']
    }

    try { getTaxes(q) } catch (error) {
      expect(error.message).toMatch(/country neverland not found/i)
      expect(error.statusCode).toEqual(404)
    }
  })

  test('No tax by name', () => {
    const q = {
      country: 'mx',
      taxes: ['XYZ']
    }

    try { getTaxes(q) } catch (error) {
      expect(error.message).toMatch(/tax rules not found/i)
      expect(error.statusCode).toEqual(404)
    }
  })
})
