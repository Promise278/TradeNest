const express = require("express")
const { register, login, } = require("../controller/auth.controller")
const { registerLimiter, loginLimiter } = require("../middleware/ratelimit.middleware")
const router = express.Router()

router.post("/register", registerLimiter, register)
router.post("/login", loginLimiter, login)

module.exports = router