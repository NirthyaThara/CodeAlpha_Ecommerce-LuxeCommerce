require('dotenv').config({ path: './backend/.env' });
const db = require('./backend/db');
async function checkData() {
    try {
        const [categories] = await db.query("SELECT * FROM Category");
        console.log("Categories:", JSON.stringify(categories, null, 2));
        const [products] = await db.query("SELECT prod_id, prod_name, category_id FROM Products WHERE prod_name LIKE '%bracelet%'");
        console.log("Products:", JSON.stringify(products, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}
checkData();
