const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const db = require("../db");

async function importRealData() {
    try {
        console.log("🚀 Starting data import...");

        // 1. Clear existing products to avoid conflicts
        console.log("🧹 Clearing old products...");
        await db.query("SET FOREIGN_KEY_CHECKS = 0");
        await db.query("TRUNCATE TABLE Products");
        await db.query("SET FOREIGN_KEY_CHECKS = 1");

        // 2. Ensure Categories exist and get their IDs
        console.log("📂 Syncing categories...");
        const categories = [
            'Digital', 'Stationery', 'Art Supplies', 'Fasion', 'Accessories', 'Seasonal Products'
        ];

        for (const catName of categories) {
            await db.query(`
                INSERT IGNORE INTO Category (category_desc) 
                VALUES (?)
            `, [catName]);
        }

        const [catRows] = await db.query("SELECT category_id, category_desc FROM Category");
        const catMap = {};
        catRows.forEach(row => {
            catMap[row.category_desc] = row.category_id;
        });

        // 3. Insert real products
        // Data extracted from ecommerce.sql
        const products = [
            {
                name: 'A3 ruled Notebook',
                desc: '200 pages ruled premium notebook with elastic band',
                sale: 250.00,
                list: 500.00,
                stock: 50,
                img: '1766862477794.jpg',
                cat: 'Stationery'
            },
            {
                name: 'airpods',
                desc: 'pastal blue color airpods',
                sale: 2000.00,
                list: 3000.00,
                stock: 10,
                img: '1766863478320.webp',
                cat: 'Digital'
            },
            {
                name: 'Parker pen',
                desc: 'parker blue pen set of 2',
                sale: 200.00,
                list: 500.00,
                stock: 30,
                img: '1766863551322.webp',
                cat: 'Stationery'
            },
            {
                name: 'saturn scrunchise',
                desc: 'set of 3 scrunchees',
                sale: 75.00,
                list: 100.00,
                stock: 50,
                img: '1766863630536.webp',
                cat: 'Accessories'
            },
            {
                name: 'DOMS Watercolour pencils',
                desc: 'Artist Grade Watercolor Water Soluble Colored Pencil Set 12 Assorted Bright Watercolor Pencils...',
                sale: 125.00,
                list: 250.00,
                stock: 100,
                img: '1766863826240.webp',
                cat: 'Stationery'
            },
            {
                name: 'One Plus Nord5',
                desc: 'One Plus smart phone',
                sale: 24999.00,
                list: 22999.00, // Note: list < sale in original dump data
                stock: 10,
                img: '1766911339151.jpg',
                cat: 'Digital'
            }
        ];

        console.log("📦 Inserting real products...");
        for (const p of products) {
            const catId = catMap[p.cat] || null;
            await db.query(`
                INSERT INTO Products 
                (prod_name, prod_desc, category_id, sale_price, list_price, created_by, stock, image_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [p.name, p.desc, catId, p.sale, p.list, 'System', p.stock, p.img]);
        }

        console.log("✅ Data import completed successfully!");
    } catch (err) {
        console.error("❌ Data import failed:", err);
    } finally {
        process.exit();
    }
}

importRealData();
