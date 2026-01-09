require("dotenv").config();
const db = require("./db");

async function testCart() {
    const testEmail = "test_auth_user@example.com";

    console.log("1. Fetching test user...");
    const [users] = await db.query("SELECT user_id FROM Users WHERE email_id = ?", [testEmail]);
    if (users.length === 0) {
        console.error("❌ Test user not found. Run test_auth.js first.");
        process.exit(1);
    }
    const userId = users[0].user_id;

    console.log("2. Fetching a product...");
    const [products] = await db.query("SELECT prod_id FROM Products LIMIT 1");
    if (products.length === 0) {
        console.error("❌ No products found. Run rebuild_db.js first.");
        process.exit(1);
    }
    const prodId = products[0].prod_id;

    console.log("\n3. Testing Add to Cart URL logic...");
    try {
        // Mimic addToCart logic
        const [existing] = await db.query(
            "SELECT * FROM Cart WHERE user_id = ? AND prod_id = ?",
            [userId, prodId]
        );

        if (existing.length > 0) {
            await db.query("UPDATE Cart SET quantity = quantity + 1 WHERE id = ?", [existing[0].id]);
        } else {
            await db.query("INSERT INTO Cart (user_id, prod_id, quantity) VALUES (?, ?, 1)", [userId, prodId]);
        }
        console.log("   ✅ Add to cart success.");
    } catch (err) {
        console.error("   ❌ Add to cart failed:", err.message);
    }

    console.log("\n4. Testing Get Cart join...");
    try {
        const [rows] = await db.query(
            `SELECT c.id, c.prod_id, c.quantity, p.prod_name, p.image_url, p.list_price, p.sale_price 
             FROM Cart c 
             JOIN Products p ON c.prod_id = p.prod_id 
             WHERE c.user_id = ?`,
            [userId]
        );
        console.log("   ✅ Get cart success. Items count:", rows.length);
        if (rows.length > 0) {
            console.log("   ✅ First item name:", rows[0].prod_name);
        }
    } catch (err) {
        console.error("   ❌ Get cart failed:", err.message);
    } finally {
        process.exit();
    }
}

testCart();
