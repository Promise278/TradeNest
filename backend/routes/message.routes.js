const express = require("express");
const {
  listMessages,
  sendMessage,
  markMessageRead,
} = require("../controller/message.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", readLimiter, listMessages);
router.post("/", writeLimiter, sendMessage);
router.patch("/:id/read", writeLimiter, markMessageRead);

module.exports = router;
