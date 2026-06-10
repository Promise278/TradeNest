const express = require("express");
const {
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/address.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", readLimiter, listAddresses);
router.post("/", writeLimiter, createAddress);
router.put("/:id", writeLimiter, updateAddress);
router.delete("/:id", writeLimiter, deleteAddress);

module.exports = router;
