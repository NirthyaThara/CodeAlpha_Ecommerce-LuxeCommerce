const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  register,
  login
} = require("../controllers/userControllers");

const { verifyToken, verifyAdmin } = require("../middleware/auth");

/* =======================
   PUBLIC AUTH ROUTES
======================= */
router.post("/register", register);
router.post("/login", login);

/* =======================
   ADMIN PROTECTED ROUTES
   /api/users
======================= */
router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.get("/:id", verifyToken, verifyAdmin, getUserById);
router.post("/", verifyToken, verifyAdmin, createUser);
router.put("/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

module.exports = router;
