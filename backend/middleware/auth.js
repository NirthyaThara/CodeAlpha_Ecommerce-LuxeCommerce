const jwt = require("jsonwebtoken");

/* =======================
   VERIFY TOKEN
======================= */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 IMPORTANT: always normalize role_id
    req.user = {
      id: decoded.id,
      role_id: Number(decoded.role_id)
    };

    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/* =======================
   VERIFY ADMIN
======================= */
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role_id !== 1) {
    return res.status(403).json({ message: "Admins only" });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdmin
};
