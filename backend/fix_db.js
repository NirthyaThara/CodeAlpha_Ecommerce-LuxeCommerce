const db = require("./db");

const fixDb = async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ DB Connected");

        await connection.query("DROP TABLE IF EXISTS order_items");
        console.log("Dropped order_items");

        await connection.query("DROP TABLE IF EXISTS orders");
        console.log("Dropped orders");

        // allow setupDb to run next time
        console.log("Tables dropped. Restart server to recreate them.");

        connection.release();
    } catch (e) {
        console.error("❌ Error:", e.message);
    } finally {
        process.exit();
    }
};

fixDb();
