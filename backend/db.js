const mysql = require("mysql2/promise");
const fs = require("fs");

const db = mysql.createPool({
  host: process.env.DB_HOST,          // PUBLIC Aiven host only
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),  // IMPORTANT
  ssl: {
    ca: fs.readFileSync("/etc/secrets/ca.pem"),
  },
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 20000,
});

// Test connection
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL connected on Render");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL FAILED", err);
  }
})();

module.exports = db;
