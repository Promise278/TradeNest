require('dotenv').config();

// Force IPv4 — must run before any pg connection attempt.
// This machine has no IPv6 routing; pg tries IPv6 first and immediately
// gets "Network is unreachable", timing out before it tries IPv4.
const dns = require('dns');
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const { Sequelize } = require('sequelize');

// Use individual params instead of DATABASE_URL to avoid pg-connection-string
// misinterpreting the sslmode query param (triggers a breaking SSL warning in pg v8+).
const connection = new Sequelize({
  dialect:  'postgres',
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

module.exports = connection;
