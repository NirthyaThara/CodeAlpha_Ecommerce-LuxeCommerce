-- Consolidated Schema for Deployment
-- Run this in your remote MySQL database query console

-- 1. Roles & Users
CREATE TABLE IF NOT EXISTS Roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_desc VARCHAR(100),
    created_by VARCHAR(100) DEFAULT 'System',
    created_dt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Users ( 
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    passwrd VARCHAR(100) NOT NULL,
    email_id VARCHAR(100) UNIQUE,
    role_id INT,
    created_by VARCHAR(100) DEFAULT 'System',
    created_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- 2. Products & Categories
CREATE TABLE IF NOT EXISTS Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_desc VARCHAR(100),
    created_by VARCHAR(100) DEFAULT 'System',
    created_dt DATETIME DEFAULT CURRENT_TIMESTAMP
);

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
);

-- 3. Orders & Cart
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (prod_id) REFERENCES Products(prod_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Processing',
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'System',
    created_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Order_Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (prod_id) REFERENCES Products(prod_id) ON DELETE CASCADE
);

-- Initial Data (Optional - Keep minimal)
INSERT IGNORE INTO Roles (role_id, role_desc) VALUES (1, 'Admin'), (2, 'User');
