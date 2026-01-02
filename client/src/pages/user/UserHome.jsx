import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCards from "../../features/products/components/ProductCards";
import { getAllProducts } from "../../api/prodAPI";
import "../../App.css";

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProducts(1, 12, ""); // Fetch first page
      setProducts(res.data.prods || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="user-dashboard" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section" style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div className="hero-content">
          <h1>Welcome to LuxeCommerce</h1>
          <p>
            Discover the finest collection of premium products, curated just for you.
            Experience luxury shopping like never before.
          </p>
        </div>
      </div>

      {/* Product List Section */}
      <div className="user-table-container" style={{ border: "none", boxShadow: "none", textAlign: "center", flexGrow: 1 }}>
        <h2>Latest Collections</h2>

        {loading ? (
          <p className="loading-text">Loading collections...</p>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : (
          <ProductCards
            products={products}
            isAdmin={false} // 🔒 Hide Edit/Delete
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserHome;
