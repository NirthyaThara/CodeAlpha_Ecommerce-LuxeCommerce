const db = require("./db");
const bcrypt = require("bcryptjs");

const createTestUser = async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ DB Connected");

        const email = "test@test.com";
        const password = "123";
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if exists
        const [existing] = await connection.query("SELECT * FROM Users WHERE email = ?", [email]);
        if (existing.length > 0) {
            console.log("⚠️ Test user already exists. Updating password to '123'...");
            await connection.query("UPDATE Users SET password_hash = ? WHERE email = ?", [hashedPassword, email]);
        } else {
            console.log("Creating new test user...");
            await connection.query(
                "INSERT INTO Users (user_name, email, password_hash, role_id) VALUES (?, ?, ?, 2)",
                ["Test User", email, hashedPassword]
            );
        }

        console.log("✅ Test User Ready.");
        console.log("📧 Email: test@test.com");
        console.log("🔑 Password: 123");

        connection.release();
    } catch (e) {
        console.error("❌ Error:", e.message);
    } finally {
        process.exit();
    }
};

createTestUser();
