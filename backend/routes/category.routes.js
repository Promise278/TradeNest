const express = require("express");
const {
  listCategories,
  createCategory,
  getCategory,
} = require("../controller/category.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.get("/", readLimiter, listCategories);
router.get("/:id", readLimiter, getCategory);
router.post("/", writeLimiter, authMiddleware, createCategory);

module.exports = router;
