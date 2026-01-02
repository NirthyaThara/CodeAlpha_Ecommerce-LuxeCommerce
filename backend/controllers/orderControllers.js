const db = require("../db");

// Create Order (Checkout)
const createOrder = async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const userId = req.user.id;
        const { total_amount, items } = req.body;
        console.log("------- CREATE ORDER DEBUG -------");
        console.log("User ID:", userId);
        console.log("Payload total_amount:", total_amount);
        console.log("Payload items count:", items?.length);
        if (items && items.length > 0) {
            console.log("First item sample:", items[0]);
        }

        if (!items || items.length === 0) {
            throw new Error("No items to place order");
        }

        // 1. Create Order Record
        const [orderResult] = await connection.query(
            "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'Processing')",
            [userId, total_amount]
        );
        const orderId = orderResult.insertId;
        console.log("Order Created ID:", orderId);

        // 2. Insert Order Items
        const orderItems = items.map(item => [
            orderId,
            item.prod_id,
            item.quantity,
            item.sale_price || item.list_price
        ]);

        await connection.query(
            "INSERT INTO order_items (order_id, prod_id, quantity, price) VALUES ?",
            [orderItems]
        );
        console.log("Order Items Inserted in DB");

        // 3. Clear User's Cart
        await connection.query("DELETE FROM cart WHERE user_id = ?", [userId]);
        console.log("Cart Cleared for User:", userId);

        await connection.commit();
        res.status(201).json({ message: "Order placed successfully", orderId });
    } catch (err) {
        console.error("❌ Order Transaction Failed:", err);
        console.error("Error Message:", err.message);
        console.error("Error SqlMessage:", err.sqlMessage);
        await connection.rollback();
        res.status(500).json({ error: err.message, detailed: err.sqlMessage });
    } finally {
        connection.release();
    }
};

// Get User Orders
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const [orders] = await db.query(
            "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
            [userId]
        );
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const [orders] = await db.query(
            "SELECT o.order_id AS id, o.user_id, o.total_amount, o.status, o.created_at, u.user_name, u.email FROM orders o JOIN Users u ON o.user_id = u.user_id ORDER BY o.created_at DESC"
        );
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder, getUserOrders, getAllOrders };
