const mysql = require("mysql2/promise");
require("dotenv").config();

// Connection String
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.resolve("ca.pem")),
    },
    connectTimeout: 10000,
});

// Test Connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log(`✅ Connected to Database: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        connection.release();
    }
    catch (error) {
        console.error("❌ MySQL Connection failed:", {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            error: error.message
        });
    }
})();

module.exports = db;
