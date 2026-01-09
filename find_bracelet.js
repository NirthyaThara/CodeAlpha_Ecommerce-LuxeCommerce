const db = require('./backend/db');
async function findBracelet() {
    try {
        const [rows] = await db.query("SELECT * FROM Products WHERE prod_name LIKE '%bracelet%'");
        console.log(JSON.stringify(rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}
findBracelet();
