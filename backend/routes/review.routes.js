const express = require("express");
const {
  listProductReviews,
  createReview,
  deleteReview,
} = require("../controller/review.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.get("/product/:productId", readLimiter, listProductReviews);
router.post("/", writeLimiter, authMiddleware, createReview);
router.delete("/:id", writeLimiter, authMiddleware, deleteReview);

module.exports = router;
