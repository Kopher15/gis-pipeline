'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  // ADD THIS BLOCK BELOW
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', function (err) {
  console.error('Unexpected error on idle PG client:', err.message);
});

module.exports = pool;
