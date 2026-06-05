const express = require("express")
const { create_products, seeAllproducts, getuserproducts, updateproducts, deleteproducts, seeSingleproducts } = require("../controller/product.controller")
const { authMiddleware } = require("../middleware/auth.middleware");
const { readLimiter, writeLimiter } = require("../middleware/ratelimit.middleware")
const router = express.Router()

// Reads — generous limit (100/min)
router.post("/seeAllproducts", readLimiter, authMiddleware, seeAllproducts)
router.post("/seeSingleproducts", readLimiter, authMiddleware, seeSingleproducts)

// Writes — stricter limit (20/min) to prevent spam
router.post("/createproducts", writeLimiter, authMiddleware, create_products)
router.post("/updatedproducts", writeLimiter, authMiddleware, updateproducts)
router.post("/deleteproducts", writeLimiter, authMiddleware, deleteproducts)


module.exports = router