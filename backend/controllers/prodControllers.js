const db = require("../db.js");

/* ===============================
   GET ALL PRODUCTS (Search + Pagination)
================================ */
const getAllProd = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;

    let whereClause = "";
    let params = [];

    if (search) {
      whereClause = `
        WHERE prod_name LIKE ?
        OR prod_desc LIKE ?
      `;
      params.push(`%${search}%`, `%${search}%`);
    }

    // Count total
    const [count] = await db.query(
      `SELECT COUNT(*) as total FROM Products ${whereClause}`,
      params
    );

    // Fetch products
    const [prods] = await db.query(
      `
      SELECT prod_id, prod_name, prod_desc, sale_price, list_price,
             category_name, created_by, stock, image_url
      FROM Products
      ${whereClause}
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );

    res.json({
      prods,
      totalPages: Math.ceil(count[0].total / limit),
      currentPage: page,
    });

  } catch (error) {
    console.error("Error in getAllProd:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   GET PRODUCT BY ID
================================ */
const getProdById = async (req, res) => {
  try {
    const { id } = req.params;

    const [prods] = await db.query(
      `
      SELECT p.prod_id, p.prod_name, p.prod_desc, p.sale_price, p.list_price,
             p.category_name, p.created_by, p.stock, p.image_url,
             u.user_name AS creator_name
      FROM Products p
      LEFT JOIN Users u ON p.created_by = u.user_id
      WHERE p.prod_id = ?
      `,
      [id]
    );

    if (prods.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(prods[0]);

  } catch (error) {
    console.error("Error in getProdById:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   CREATE PRODUCT
================================ */
const createProd = async (req, res) => {
  try {
    const {
      prod_name,
      prod_desc,
      category_name,
      sale_price,
      list_price,
      created_by,
      stock
    } = req.body;

    // Image from multer
    const image_url = req.file ? req.file.filename : null;

    if (
      !prod_name ||
      !prod_desc ||
      !category_name ||
      !list_price ||
      !created_by ||
      stock == null
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const [result] = await db.query(
      `
      INSERT INTO Products
      (prod_name, prod_desc, category_name, sale_price, list_price, created_by, stock, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        prod_name,
        prod_desc,
        category_name,
        sale_price || null,
        list_price,
        created_by,
        stock,
        image_url
      ]
    );

    res.status(201).json({
      message: "Product created successfully",
      prod_id: result.insertId,
      image_url
    });

  } catch (error) {
    console.error("Error in createProd:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   UPDATE PRODUCT
================================ */
const updateProd = async (req, res) => {
  try {
    const { id } = req.params;
    const { prod_name, prod_desc, sale_price, list_price, stock } = req.body;

    const image_url = req.file ? req.file.filename : null;

    if (
      !prod_name ||
      !prod_desc ||
      list_price == null ||
      stock == null
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    let query = `
      UPDATE Products
      SET prod_name = ?, prod_desc = ?, sale_price = ?, list_price = ?, stock = ?
    `;
    let params = [prod_name, prod_desc, sale_price || null, list_price, stock];

    if (image_url) {
      query += `, image_url = ?`;
      params.push(image_url);
    }

    query += ` WHERE prod_id = ?`;
    params.push(id);

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated" });

  } catch (error) {
    console.error("Error in updateProd:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   DELETE PRODUCT
================================ */
const deleteProd = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM Products WHERE prod_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });

  } catch (error) {
    console.error("Error in deleteProd:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProd,
  getProdById,
  createProd,
  updateProd,
  deleteProd,
};
