const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const prodRoutes = require("./routes/prodRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

/* ===============================
   CORS Configuration
================================ */
app.use(
   cors({
      origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5180"], // Allow multiple local ports
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
   })
);

/* ===============================
   Middleware
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   Static Files
================================ */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===============================
   Routes
================================ */
app.use("/api/users", userRoutes);
app.use("/api/prod", prodRoutes);
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Run DB Setup
require("./setupDb")();

app.get("/", (req, res) => {
   res.json({ message: "API is running" });
});

/* ===============================
   Error fallback (VERY IMPORTANT)
================================ */
app.use((err, req, res, next) => {
   console.error("Global error:", err);
   res.status(500).json({ message: "Internal server error" });
});

/* ===============================
   Start Server
================================ */
app.listen(PORT, () => {
   console.log(`✅ Server running at http://localhost:${PORT}`);
});
