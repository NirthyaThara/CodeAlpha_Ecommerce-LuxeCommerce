require("dotenv").config();
const db = require("./db");

async function checkProducts() {
    try {
        const [rows] = await db.query("SELECT * FROM Products");
        console.log("DB Products Found:", rows.length);
        console.log(JSON.stringify(rows, null, 2));
    } catch (err) {
        console.error("❌ DB Query Failed:", err);
    } finally {
        process.exit();
    }
}

checkProducts();
