const express = require("express");
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require("../controllers/cartControllers");
const { verifyToken } = require("../middleware/auth");

// All cart routes require login
router.get("/", verifyToken, getCart);
router.post("/", verifyToken, addToCart);
router.put("/", verifyToken, updateCartItem);
router.delete("/:id", verifyToken, removeFromCart);
router.delete("/", verifyToken, clearCart);

module.exports = router;
