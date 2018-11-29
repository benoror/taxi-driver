const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory')
const data = require('./db_data');
const db = low(new Memory());

db.defaults(data)
  .write()

module.exports = db;
