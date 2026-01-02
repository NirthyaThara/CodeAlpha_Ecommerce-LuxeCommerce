const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders } = require("../controllers/orderControllers");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);
router.get("/all", verifyToken, verifyAdmin, getAllOrders);

module.exports = router;
