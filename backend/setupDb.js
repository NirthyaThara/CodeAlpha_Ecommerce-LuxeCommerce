const db = require("./db");

const setupDatabase = async () => {
    try {
        const connection = await db.getConnection();

        // 1. Create CART Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS cart (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                prod_id INT NOT NULL,
                quantity INT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (prod_id) REFERENCES products(prod_id) ON DELETE CASCADE
            )
        `);
        console.log("✅ Cart Table Verified/Created");

        // 2. Create ORDERS Table (if not exists)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS orders (
                order_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                total_amount DECIMAL(10,2) NOT NULL,
                status VARCHAR(50) DEFAULT 'Processing',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
            )
        `);
        console.log("✅ Orders Table Verified/Created");

        // 3. Create ORDER ITEMS Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                prod_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
                FOREIGN KEY (prod_id) REFERENCES products(prod_id) ON DELETE CASCADE
            )
        `);
        console.log("✅ Order Items Table Verified/Created");

        connection.release();
    } catch (error) {
        console.error("❌ Database Setup Failed:", error);
    }
};

module.exports = setupDatabase;
