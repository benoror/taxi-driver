const { send } = require('micro');
const cors = require('micro-cors')();
const { router, get, post } = require('microrouter');

const db = require('./db');
const { salesTax } = require('./getTax');

const home = (req, res) => send(res, 200, 'You talkin\' to me?');
const countries = (req, res) => send(res, 200, {
  countries: db.get('countries').value()
});
const rules = (req, res) => send(res, 200, {
  rules: db.get('rules').value()
});
const getSalesTax = (req, res) => send(res, 200, {
  item: salesTax(req.country, req)
});

module.exports = cors(router(
  get('/', home),
  get('/countries', countries),
  get('/rules', rules),
  post('/getSalesTax', getSalesTax),
));

