const { getTaxes } = require('../../lib');

describe('Required Validations', () => {
  test('No country for old men', () => {
    const q = {
      country: 'neverland',
    };
    expect(() => getTaxes(q)).toThrowError(/country neverland not found/i);
  });

  test('No tax name', () => {
    const q = {
      country: 'mx',
      taxes: ['XYZ'],
    };

    expect(() => getTaxes(q)).toThrowError(/tax rules not found/i);
  });
});
