const express = require("express");
const {
  listNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} = require("../controller/notification.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", readLimiter, listNotifications);
router.patch("/read-all", writeLimiter, markAllNotificationsRead);
router.patch("/:id/read", writeLimiter, markNotificationRead);

module.exports = router;
