require("dotenv").config();

const minutes = (n) => n * 60 * 1000;
const hours = (n) => n * 60 * 60 * 1000;

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const toBool = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
};

module.exports = {
  enabled: toBool(process.env.RATE_LIMIT_ENABLED, true),
  trustProxy: toBool(process.env.TRUST_PROXY, false),
  redisUrl: process.env.REDIS_URL || null,

  global: {
    windowMs: toInt(process.env.RATE_LIMIT_GLOBAL_WINDOW_MS, minutes(15)),
    max: toInt(process.env.RATE_LIMIT_GLOBAL_MAX, 300),
  },

  auth: {
    register: {
      windowMs: toInt(process.env.RATE_LIMIT_REGISTER_WINDOW_MS, hours(1)),
      max: toInt(process.env.RATE_LIMIT_REGISTER_MAX, 5),
    },
    login: {
      windowMs: toInt(process.env.RATE_LIMIT_LOGIN_WINDOW_MS, minutes(15)),
      max: toInt(process.env.RATE_LIMIT_LOGIN_MAX, 10),
      skipSuccessfulRequests: toBool(
        process.env.RATE_LIMIT_LOGIN_SKIP_SUCCESS,
        true
      ),
    },
  },

  api: {
    read: {
      windowMs: toInt(process.env.RATE_LIMIT_READ_WINDOW_MS, minutes(1)),
      max: toInt(process.env.RATE_LIMIT_READ_MAX, 120),
    },
    write: {
      windowMs: toInt(process.env.RATE_LIMIT_WRITE_WINDOW_MS, minutes(1)),
      max: toInt(process.env.RATE_LIMIT_WRITE_MAX, 30),
    },
  },
};
