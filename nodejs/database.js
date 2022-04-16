const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require ('pg');

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: { rejectUnauthorized: false },
  max: 5,
  statement_timeout: 10000,
});


module.exports = pool;

