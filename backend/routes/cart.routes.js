const express = require("express");
const {
  listCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} = require("../controller/cart.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", readLimiter, listCartItems);
router.post("/", writeLimiter, addCartItem);
router.put("/:id", writeLimiter, updateCartItem);
router.delete("/:id", writeLimiter, deleteCartItem);

module.exports = router;
