const express = require("express");
const {
  listOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
} = require("../controller/order.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", readLimiter, listOrders);
router.get("/:id", readLimiter, getOrder);
router.post("/", writeLimiter, createOrder);
router.patch("/:id/status", writeLimiter, updateOrderStatus);

module.exports = router;
