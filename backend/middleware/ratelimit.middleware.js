const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit");
const rateLimitConfig = require("../config/ratelimit.config");
const { createStore } = require("./ratelimit.store");

const store = createStore();

const noOpLimiter = (_req, _res, next) => next();

const createRateLimitHandler =
  (message) =>
  (req, res, _next, options) => {
    const retryAfterSeconds = Math.ceil(
      (options?.windowMs ?? 60_000) / 1000
    );

    res.status(429).json({
      success: false,
      status: 429,
      code: "RATE_LIMIT_EXCEEDED",
      message,
      retryAfter: retryAfterSeconds,
      path: req.originalUrl,
    });
  };

const createLimiter = ({
  name,
  windowMs,
  max,
  message,
  keyGenerator = ipKeyGenerator,
  skipSuccessfulRequests = false,
  skip,
}) => {
  if (!rateLimitConfig.enabled) return noOpLimiter;

  return rateLimit({
    windowMs,
    max,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    store,
    keyGenerator,
    skipSuccessfulRequests,
    skip: skip ?? ((req) => req.method === "OPTIONS"),
    handler: createRateLimitHandler(message),
    message,
    validate: rateLimitConfig.trustProxy ? { trustProxy: true } : false,
    id: name,
  });
};

const authenticatedKeyGenerator = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.slice(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded?.id) return `user:${decoded.id}`;
    } catch {
      // Invalid or expired token — rate limit by IP until auth succeeds.
    }
  }

  return ipKeyGenerator(req);
};

const emailAwareAuthKeyGenerator = (req) => {
  const email = req.body?.email?.trim()?.toLowerCase();
  if (email) return `auth:${email}:${ipKeyGenerator(req)}`;
  return ipKeyGenerator(req);
};

const globalLimiter = createLimiter({
  name: "global",
  windowMs: rateLimitConfig.global.windowMs,
  max: rateLimitConfig.global.max,
  message:
    "Too many requests from this IP. Please wait before trying again.",
  skip: (req) =>
    req.method === "OPTIONS" ||
    req.path === "/" ||
    req.path === "/health",
});

const registerLimiter = createLimiter({
  name: "auth-register",
  windowMs: rateLimitConfig.auth.register.windowMs,
  max: rateLimitConfig.auth.register.max,
  message:
    "Too many registration attempts. Please wait before creating another account.",
  keyGenerator: ipKeyGenerator,
});

const loginLimiter = createLimiter({
  name: "auth-login",
  windowMs: rateLimitConfig.auth.login.windowMs,
  max: rateLimitConfig.auth.login.max,
  message:
    "Too many login attempts. Please wait before trying again.",
  keyGenerator: emailAwareAuthKeyGenerator,
  skipSuccessfulRequests: rateLimitConfig.auth.login.skipSuccessfulRequests,
});

const readLimiter = createLimiter({
  name: "api-read",
  windowMs: rateLimitConfig.api.read.windowMs,
  max: rateLimitConfig.api.read.max,
  message: "Too many read requests. Please slow down.",
  keyGenerator: authenticatedKeyGenerator,
});

const writeLimiter = createLimiter({
  name: "api-write",
  windowMs: rateLimitConfig.api.write.windowMs,
  max: rateLimitConfig.api.write.max,
  message: "Too many write requests. Please slow down.",
  keyGenerator: authenticatedKeyGenerator,
});

// Backward-compatible alias used by auth routes.
const authLimiter = registerLimiter;

module.exports = {
  globalLimiter,
  registerLimiter,
  loginLimiter,
  authLimiter,
  readLimiter,
  writeLimiter,
};
