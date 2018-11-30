const cors = require('micro-cors')();
const { router, get, post } = require('microrouter');

const home = require('./api/');
const countries = require('./api/countries');
const rules = require('./api/rules');
const taxes = require('./api/taxes');

module.exports = cors(router(
  get('/api', home),
  get('/api/countries', countries),
  get('/api/rules', rules),
  post('/api/taxes', taxes),
));

