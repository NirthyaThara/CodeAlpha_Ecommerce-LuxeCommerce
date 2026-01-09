const mysql = require("mysql2/promise");

console.log("🔌 Attempting DB Connection with config:");
console.log(`   Host: ${process.env.DB_HOST}`);
console.log(`   Port: ${process.env.DB_PORT}`);
console.log(`   User: ${process.env.DB_USER}`);
console.log(`   Database: ${process.env.DB_NAME}`);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT), // Ensure this is a number

  family: 4, // force IPv4

  ssl: {
    rejectUnauthorized: false,
  },

  connectTimeout: 30000,
  waitForConnections: true,
  connectionLimit: 10,
});

// Test immediately
(async () => {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("✅ MySQL connected to Aiven from Render");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();

module.exports = db;
