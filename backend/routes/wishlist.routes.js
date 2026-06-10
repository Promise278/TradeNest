const express = require("express");
const {
  listWishlist,
  addWishlistItem,
  removeWishlistItem,
} = require("../controller/wishlist.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", readLimiter, listWishlist);
router.post("/", writeLimiter, addWishlistItem);
router.delete("/:id", writeLimiter, removeWishlistItem);

module.exports = router;
