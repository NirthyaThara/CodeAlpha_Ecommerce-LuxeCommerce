const db = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// GET ALL USERS
// =======================
const getAllUsers = async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;

    let query = "SELECT user_id, user_name, email, role_id FROM Users";
    let countQuery = "SELECT COUNT(*) AS total FROM Users";
    let params = [];
    let countParams = [];

    if (search) {
      query += " WHERE user_name LIKE ? OR email LIKE ?";
      countQuery += " WHERE user_name LIKE ? OR email LIKE ?";
      params.push(`%${search}%`, `%${search}%`);
      countParams = [...params];
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [count] = await db.query(countQuery, countParams);
    const [users] = await db.query(query, params);

    res.json({
      users,
      totalPages: Math.ceil(count[0].total / limit),
      currentPage: page,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET USER BY ID
// =======================
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await db.query(
      "SELECT user_id, user_name, email, role_id FROM Users WHERE user_id = ?",
      [id]
    );

    if (!users.length) return res.status(404).json({ message: "User not found" });

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// CREATE USER (ADMIN)
// =======================
const createUser = async (req, res) => {
  try {
    const { user_name, email, password, role_id } = req.body;
    if (!user_name || !email || !password || !role_id)
      return res.status(400).json({ message: "All fields are required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO Users (user_name, email, password_hash, role_id) VALUES (?, ?, ?, ?)",
      [user_name, email, hashedPassword, role_id]
    );

    res.status(201).json({
      message: "User created",
      user_id: result.insertId,
    });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Email already exists" });
    res.status(500).json({ message: err.message });
  }
};

// =======================
// UPDATE USER
// =======================
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, email, role_id } = req.body;

    const [result] = await db.query(
      "UPDATE Users SET user_name=?, email=?, role_id=? WHERE user_id=?",
      [user_name, email, role_id, id]
    );

    if (!result.affectedRows) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// DELETE USER
// =======================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM Users WHERE user_id=?", [id]);
    if (!result.affectedRows) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// REGISTER (PUBLIC)
// =======================
const register = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    if (!user_name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email format" });

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO Users (user_name, email, password_hash, role_id) VALUES (?, ?, ?, 2)",
      [user_name, email, hashed]
    );

    res.status(201).json({ message: "Registered successfully" });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Email already exists" });
    res.status(500).json({ message: err.message });
  }
};

// =======================
// LOGIN
// =======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const [users] = await db.query("SELECT * FROM Users WHERE email=?", [email]);
    console.log("Login Debug - Email:", email);
    console.log("Login Debug - Users Found:", users.length);

    if (!users.length) return res.status(401).json({ message: "Invalid credentials" });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);
    console.log("Login Debug - Password Match:", match);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET missing in .env" });
    }

    const token = jwt.sign({ id: user.user_id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { user_id: user.user_id, user_name: user.user_name, email, role_id: user.role_id } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  register,
  login,
};
