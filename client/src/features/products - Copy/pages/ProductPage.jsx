import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListTopBar from "../../../components/common/ListTopBar";
import ProductCards from "../components/ProductCards";
import Pagination from "../../../components/common/Pagination";

import { getAllProducts, deleteProduct } from "../../../api/prodAPI";
import "./productStyles.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 12;
  const navigate = useNavigate();

  // 🔄 Load products (list + search)
  const loadProducts = async (page = 1, searchTerm = "") => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllProducts(page, limit, searchTerm);

      setProducts(res.data.prods || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Initial load
  useEffect(() => {
    loadProducts(1, "");
  }, []);

  // 🔍 Search
  const handleSearch = () => {
    setCurrentPage(1);
    loadProducts(1, search.trim());
  };

  // 📄 Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadProducts(page, search.trim());
  };

  // ➕ Add product
  const handleAdd = () => navigate("/prod/add");

  // ✏️ Edit product
  const handleEdit = (id) => navigate(`/prod/edit/${id}`);

  // 🗑 Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);

      const newPage =
        products.length === 1 && currentPage > 1
          ? currentPage - 1
          : currentPage;

      loadProducts(newPage, search.trim());
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="product-container">

      {/* 🔝 Reusable Top Bar */}
      <ListTopBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleAdd={handleAdd}
        loading={loading}
        error={error}
        retry={() => loadProducts(currentPage, search)}
        placeholder="Search products..."
        addLabel="+ Add Product"
      />

      {/* 🧱 Product Cards */}
      {!loading && !error && (
        <>
          <ProductCards
            products={products}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {loading && <p>⏳ Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProductPage;
