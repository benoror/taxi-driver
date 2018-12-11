const { bestMatch } = require('./match')

describe('Best match algorithm', () => {
  let params
  let haystack

  beforeAll(() => {
    params = ['Title', 'Name', 'Number', 'output']
    haystack = [
      { 'Title': 'UserA', 'Name': 'Bob Smith', 'Number': 1234, 'output': 'hello' },
      { 'Title': 'UserA', 'Name': 'Bob Smith', 'Number': 1234 },
      { 'Title': 'UserA', 'Name': 'Bob Smith', 'Number': 123 },
      { 'Title': 'UserA', 'Name': 'Bob Smith', 'Number': 12333, 'output': 'hello' },
      { 'Title': 'UserA', 'Name': 'Bob Smith' }
    ]
  })

  test('Best match 3 out of 4', () => {
    const query = { 'Title': 'UserA', 'Name': 'Bob Smith', 'Number': 12333 }
    expect(bestMatch(haystack, query, params)).toEqual(haystack[3])
  })
})
