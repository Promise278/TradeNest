const express = require("express")
const { register, login, } = require("../controller/auth.controller")
const { authLimiter } = require("../middleware/ratelimit.middleware")
const router = express.Router()

router.post("/register", authLimiter, register)
router.post("/login", authLimiter, login)

module.exports = router