/**
 * IPv4 DNS bootstrap — required before any network call.
 *
 * This machine has no IPv6 routing. Without this, pg resolves the Neon
 * hostname to IPv6 addresses first, fails immediately ("Network is
 * unreachable"), then times out before falling back to IPv4.
 *
 * Usage:
 *   node --require ./scripts/ipv4-dns.js yourScript.js
 *   NODE_OPTIONS="--require ./scripts/ipv4-dns.js" npx sequelize-cli db:migrate
 */
const dns = require('dns');

if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}
