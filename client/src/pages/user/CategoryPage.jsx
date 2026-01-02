import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCards from "../../features/products/components/ProductCards";
import { getAllProducts } from "../../api/prodAPI";
import "../../App.css";

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Fetch all products and filter client-side 
                // (ideal world: API supports ?category=... but this works for now)
                const res = await getAllProducts(1, 100, "");
                const allProds = res.data.prods || [];

                // Filter case-insensitive
                const filtered = allProds.filter(p =>
                    p.category_name?.toLowerCase() === category?.toLowerCase()
                );
                setProducts(filtered);
            } catch (err) {
                console.error("Failed to load category products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <div className="category-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", margin: 0, padding: 0 }}>
            <Navbar />

            <div className="user-table-container" style={{ minHeight: "60vh", border: "none", boxShadow: "none", textAlign: "center", flexGrow: 1 }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ marginBottom: "20px", padding: "8px 16px", cursor: "pointer", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                    ← Back
                </button>
                <h2 style={{ textTransform: "capitalize" }}>{category} Collection</h2>

                {loading ? (
                    <p className="loading-text">Loading...</p>
                ) : products.length > 0 ? (
                    <ProductCards products={products} isAdmin={false} />
                ) : (
                    <p style={{ textAlign: "center", marginTop: "40px" }}>No products found in this category.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CategoryPage;
