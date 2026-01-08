require("dotenv").config();
const mysql = require("mysql2/promise");

(async () => {
    console.log("🔍 Testing Database Connection...");
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   User: ${process.env.DB_USER}`);
    console.log(`   Database: ${process.env.DB_NAME}`);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false }
        });
        console.log("✅ SUCCESS! Connected to the database.");
        await connection.end();
    } catch (error) {
        console.error("❌ CONNECTION FAILED:");
        console.error(error.message);
    }
})();
