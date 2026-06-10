const express = require("express");
const {
  listPayments,
  createPayment,
  updatePaymentStatus,
} = require("../controller/payment.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", readLimiter, listPayments);
router.post("/", writeLimiter, createPayment);
router.patch("/:id/status", writeLimiter, updatePaymentStatus);

module.exports = router;
