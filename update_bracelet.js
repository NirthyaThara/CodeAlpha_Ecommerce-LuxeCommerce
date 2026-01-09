require('dotenv').config({ path: './backend/.env' });
const db = require('./backend/db');
async function updateBracelet() {
    try {
        const [result] = await db.query("UPDATE Products SET category_id = 4 WHERE prod_name LIKE '%bracelet%'");
        console.log(`Updated ${result.affectedRows} products.`);
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}
updateBracelet();
