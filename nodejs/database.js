const pgCon = require ('pg');
const dotenv = require('dotenv');
dotenv.config();

const credentials = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  max: 10,
  idleTimeoutMillis: 30000,
  ssl: false,
};

let db = new pgCon.Pool(credentials);

module.exports = db;