require('dotenv').config();

// Force IPv4 DNS resolution — this machine has no IPv6 routing.
// pg tries IPv6 addresses first (from Neon's DNS response) and immediately
// gets "Network is unreachable", then times out before reaching IPv4.
const dns = require('dns');
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const ssl = {
  require: true,
  rejectUnauthorized: false,
};

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT || '5432', 10),
    dialect:  'postgres',
    dialectOptions: { ssl },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT || '5432', 10),
    dialect:  'postgres',
    dialectOptions: { ssl },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT || '5432', 10),
    dialect:  'postgres',
    dialectOptions: { ssl },
  },
};
