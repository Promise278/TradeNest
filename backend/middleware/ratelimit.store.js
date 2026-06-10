const rateLimitConfig = require("../config/ratelimit.config");

let sharedStore;

function createStore() {
  if (sharedStore) return sharedStore;

  const { redisUrl } = rateLimitConfig;
  if (!redisUrl) return undefined;

  try {
    const { RedisStore } = require("rate-limit-redis");
    const { createClient } = require("redis");

    const client = createClient({ url: redisUrl });
    client.on("error", (err) => {
      console.error("[ratelimit] Redis client error:", err.message);
    });

    client.connect().catch((err) => {
      console.error("[ratelimit] Redis connection failed:", err.message);
    });

    sharedStore = new RedisStore({
      sendCommand: (...args) => client.sendCommand(args),
      prefix: "tn:rl:",
    });

    console.log("[ratelimit] Using Redis-backed rate limit store");
    return sharedStore;
  } catch (err) {
    console.warn(
      "[ratelimit] Redis packages unavailable — falling back to in-memory store:",
      err.message
    );
    return undefined;
  }
}

module.exports = { createStore };
