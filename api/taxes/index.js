const { send, json } = require('micro')
const { handleErrors } = require('../../error')
const { getTaxes } = require('../../lib')

module.exports = handleErrors(async (req, res) => {
  const query = await json(req)

  return send(res, 200, getTaxes(query))
})
