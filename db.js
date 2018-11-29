const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory')
const data = require('./db.json');
const db = low(new Memory());

db.defaults(data)
  .write()

module.exports = db;
