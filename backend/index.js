const express = require("express");
const cors = require("cors");

const connection = require("./config/connection");
const authRoutes = require("./routes/auth.route");
const authProducts = require("./routes/product.routes");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  console.log("Welcome to the homepage");
  res.send("Welcome to our homepage");
});

app.use("/auth", authRoutes);
app.use("/products", authProducts);

// Sync database and start server
const PORT = process.env.PORT;
connection
  .sync({ force: false, alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
});
