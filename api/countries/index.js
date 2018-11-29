const { send } = require('micro');
const db = require('../../db');

module.exports = (req, res) => send(res, 200, {
  countries: db.get('countries').value()
});
