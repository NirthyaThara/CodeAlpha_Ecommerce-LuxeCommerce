const db = require("./db");
const bcrypt = require("bcryptjs");

const checkUsers = async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ DB Connected");

        const [users] = await connection.query("SELECT * FROM Users");
        if (users.length === 0) {
            console.log("⚠️ No users found in 'Users' table.");
        } else {
            console.log(`✅ Found ${users.length} users:`);
            users.forEach(u => {
                console.log(`- ID: ${u.user_id}, Name: ${u.user_name}, Email: ${u.email}, Role: ${u.role_id}`);
                // Don't log hash in prod, but for debug:
                console.log(`  Hash: ${u.password_hash.substring(0, 10)}...`);
            });

            // Test a known password if you want (e.g. '123')
            // const match = await bcrypt.compare('123', users[0].password_hash);
            // console.log('Test match for 123:', match);
        }

        connection.release();
    } catch (e) {
        console.error("❌ Error:", e.message);
    } finally {
        process.exit();
    }
};

checkUsers();
