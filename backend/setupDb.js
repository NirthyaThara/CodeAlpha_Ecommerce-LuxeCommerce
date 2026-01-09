const db = require("./db");

const setupDatabase = async () => {
    try {
        const connection = await db.getConnection();

        // 1. Create Roles Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Roles (
                role_id INT PRIMARY KEY AUTO_INCREMENT,
                role_desc VARCHAR(100) UNIQUE,
                created_dt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Roles Table Verified");

        // 2. Create Users Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Users ( 
                user_id INT PRIMARY KEY AUTO_INCREMENT,
                user_name VARCHAR(100) NOT NULL,
                passwrd VARCHAR(255) NOT NULL,
                email_id VARCHAR(150) UNIQUE,
                role_id INT,
                created_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (role_id) REFERENCES Roles(role_id)
            )
        `);
        console.log("✅ Users Table Verified");

        // 3. Create Category Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Category (
                category_id INT PRIMARY KEY AUTO_INCREMENT,
                category_desc VARCHAR(100) UNIQUE,
                created_dt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Category Table Verified");

        // 4. Create Products Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Products (
                prod_id INT PRIMARY KEY AUTO_INCREMENT,
                prod_name VARCHAR(100) NOT NULL,
                prod_desc VARCHAR(1000),
                category_id INT,
                sale_price FLOAT,
                list_price FLOAT,
                stock INT DEFAULT 0,
                image_url VARCHAR(255),
                created_by VARCHAR(100) DEFAULT 'System',
                created_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
                units_avai INT DEFAULT 0,
                FOREIGN KEY (category_id) REFERENCES Category(category_id)
            )
        `);
        console.log("✅ Products Table Verified");

        // 5. Create Cart Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Cart (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                prod_id INT NOT NULL,
                quantity INT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (prod_id) REFERENCES Products(prod_id) ON DELETE CASCADE
            )
        `);
        console.log("✅ Cart Table Verified");

        // 6. Create Orders Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Orders (
                order_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                total_amount DECIMAL(10,2),
                status VARCHAR(50) DEFAULT 'Processing',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
            )
        `);
        console.log("✅ Orders Table Verified");

        // 7. Create Order Items Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Order_Items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                prod_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
                FOREIGN KEY (prod_id) REFERENCES Products(prod_id) ON DELETE CASCADE
            )
        `);
        console.log("✅ Order_Items Table Verified");

        // 8. Insert Default Roles (if empty)
        const [roles] = await connection.query("SELECT * FROM Roles LIMIT 1");
        if (roles.length === 0) {
            await connection.query("INSERT INTO Roles (role_id, role_desc) VALUES (1, 'Admin'), (2, 'User')");
            console.log("🌱 Default Roles Seeded");
        }

        // 9. Insert Default Categories (if empty)
        const [categories] = await connection.query("SELECT * FROM Category LIMIT 1");
        if (categories.length === 0) {
            await connection.query(`
                INSERT INTO Category (category_id, category_desc) VALUES 
                (1, 'Digital'),
                (2, 'Stationery'),
                (3, 'Art Supplies'),
                (4, 'Fashion'),
                (5, 'Accessories'),
                (6, 'Seasonal Products')
            `);
            console.log("🌱 Default Categories Seeded");
        }

        connection.release();
    } catch (error) {
        console.error("❌ Database Setup Failed:", error);
    }
};

module.exports = setupDatabase;
