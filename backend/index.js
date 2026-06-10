require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./models");
const rateLimitConfig = require("./config/ratelimit.config");
const { globalLimiter } = require("./middleware/ratelimit.middleware");
const authRoutes = require("./routes/auth.route");
const authProducts = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const addressRoutes = require("./routes/address.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const reviewRoutes = require("./routes/review.routes");
const messageRoutes = require("./routes/message.routes");
const notificationRoutes = require("./routes/notification.routes");
const paymentRoutes = require("./routes/payment.routes");

const app = express();

if (rateLimitConfig.trustProxy) {
  app.set("trust proxy", 1);
}

app.use(express.json());
app.use(cors());
app.use(globalLimiter);

app.get("/", (_req, res) => {
  res.send("Welcome to our homepage");
});

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/products", authProducts);
app.use("/categories", categoryRoutes);
app.use("/addresses", addressRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlists", wishlistRoutes);
app.use("/reviews", reviewRoutes);
app.use("/messages", messageRoutes);
app.use("/notifications", notificationRoutes);
app.use("/payments", paymentRoutes);

const PORT = process.env.PORT;

db.sequelize
  .authenticate()
  .then(() => db.sequelize.sync({ force: false, alter: true }))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
