const { send } = require('micro')
const db = require('../../db')

module.exports = (req, res) => send(res, 200, {
  rules: db.get('taxRules').value()
})
