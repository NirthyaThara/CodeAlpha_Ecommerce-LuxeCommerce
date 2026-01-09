require("dotenv").config();
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function testAuth() {
    const testEmail = "test_auth_user@example.com";
    const testPass = "password123";

    console.log("1. Cleaning up previous test user...");
    try {
        await db.query("DELETE FROM Users WHERE email_id = ?", [testEmail]);
        console.log("   Cleanup done.");
    } catch (err) {
        console.error("   Cleanup failed:", err.message);
    }

    console.log("\n2. Testing Registration...");
    try {
        const hashed = await bcrypt.hash(testPass, 10);
        // Mimic the register controller logic
        const [result] = await db.query(
            "INSERT INTO Users (user_name, email_id, passwrd, role_id) VALUES (?, ?, ?, 2)",
            ["Test User", testEmail, hashed]
        );
        console.log("   ✅ Registration SQL Success. Insert ID:", result.insertId);
    } catch (err) {
        console.error("   ❌ Registration SQL Failed:", err.message);
        process.exit(1);
    }

    console.log("\n3. Testing Login...");
    try {
        // Mimic the login controller logic
        const [users] = await db.query("SELECT * FROM Users WHERE email_id=?", [testEmail]);

        if (users.length === 0) {
            console.error("   ❌ Login Failed: User not found in DB after registration.");
        } else {
            console.log("   ✅ User found in DB.");
            const user = users[0];
            const match = await bcrypt.compare(testPass, user.passwrd);
            if (match) {
                console.log("   ✅ Password match success.");
                console.log("   ✅ Login flow verified.");
            } else {
                console.error("   ❌ Password match failed.");
            }
        }

    } catch (err) {
        console.error("   ❌ Login SQL Failed:", err.message);
    } finally {
        process.exit();
    }
}

testAuth();
