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
const allowedOrigins = [
   "http://localhost:5173",
   "http://localhost:5174",
   "http://localhost:5180",
   "https://codealpha-ecommerce-luxecommerce.onrender.com",
   "https://luxecommerce.onrender.com",
   "https://codealpha-ecommerce-luxecommerce-1.onrender.com", // Added from user error
   process.env.FRONTEND_URL // For flexibility with env variables
];

app.use(
   cors({
      origin: (origin, callback) => {
         if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
         } else {
            callback(new Error("Not allowed by CORS"));
         }
      },
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
// Run DB Setup
require("./setupDb")(); // Re-enabled for Tables & Roles (No sample data)

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
