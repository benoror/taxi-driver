const { send, json } = require('micro');
const { getTaxes } = require('../../lib');

module.exports = async (req, res) => {
  const query = await json(req);

  return send(res, 200, getTaxes(query));
};
