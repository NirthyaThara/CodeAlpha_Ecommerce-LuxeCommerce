const db = require("../db");

// Get Cart for User
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query(
            `SELECT c.id, c.prod_id, c.quantity, p.prod_name, p.image_url, p.list_price, p.sale_price 
             FROM cart c 
             JOIN products p ON c.prod_id = p.prod_id 
             WHERE c.user_id = ?`,
            [userId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add Item to Cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { prod_id, quantity = 1 } = req.body;

        // Check if exists
        const [existing] = await db.query(
            "SELECT * FROM cart WHERE user_id = ? AND prod_id = ?",
            [userId, prod_id]
        );

        if (existing.length > 0) {
            // Update quantity
            const newQty = existing[0].quantity + quantity;
            await db.query(
                "UPDATE cart SET quantity = ? WHERE id = ?",
                [newQty, existing[0].id]
            );
        } else {
            // Insert new
            await db.query(
                "INSERT INTO cart (user_id, prod_id, quantity) VALUES (?, ?, ?)",
                [userId, prod_id, quantity]
            );
        }
        res.json({ message: "Item added to cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Quantity
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { prod_id, quantity } = req.body;

        if (quantity < 1) {
            await db.query("DELETE FROM cart WHERE user_id = ? AND prod_id = ?", [userId, prod_id]);
            return res.json({ message: "Item removed" });
        }

        await db.query(
            "UPDATE cart SET quantity = ? WHERE user_id = ? AND prod_id = ?",
            [quantity, userId, prod_id]
        );
        res.json({ message: "Cart updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove Item
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params; // prod_id

        await db.query("DELETE FROM cart WHERE user_id = ? AND prod_id = ?", [userId, id]);
        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Clear Cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await db.query("DELETE FROM cart WHERE user_id = ?", [userId]);
        res.json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
