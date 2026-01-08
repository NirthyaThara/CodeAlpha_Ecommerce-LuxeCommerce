const mysql = require("mysql2/promise");
require("dotenv").config();


//Connection String
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "ecommerce",
    port: process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: false
    }
});

//Test Connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log(`✅ Connected to Database: ${process.env.DB_NAME || "ecommerce"} on ${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 3306}`);
        connection.release();
    }
    catch (error) {
        console.error("❌ MySQL Connection failed:", {
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || "root",
            database: process.env.DB_NAME || "ecommerce",
            error: error.message
        });
    }
})();
module.exports = db;
