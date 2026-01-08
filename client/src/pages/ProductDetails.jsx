import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { getProductById, getAllProducts, deleteProduct } from "../api/prodAPI";
import "../App.css";
import { addToCartAPI } from "../api/cartAPI";

const qtyBtn = {
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "var(--text-dark)",
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [otherProducts, setOtherProducts] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role_id === 1;

    useEffect(() => {
        const loadData = async () => {
            setQuantity(1);
            setLoading(true);

            try {
                const response = await getProductById(id);
                setProduct(response.data);
                const prodData = response.data;

                const res = await getAllProducts(1, 100, "");
                const allProds = res.data.prods || [];

                const sameCategory = allProds
                    .filter((p) => p.category_name === prodData.category_name && p.prod_id !== prodData.prod_id)
                    .slice(0, 4);
                setSimilarProducts(sameCategory);

                const others = allProds
                    .filter((p) => p.category_name !== prodData.category_name && p.prod_id !== prodData.prod_id)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
                setOtherProducts(others);

            } catch (err) {
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
        window.scrollTo(0, 0);
    }, [id]);

    const price = parseFloat(product?.sale_price || product?.list_price || 0);

    const handleEdit = () => navigate(`/products/edit/${product.prod_id}`);
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(product.prod_id);
            navigate("/products");
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCartAPI(product.prod_id, quantity);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            alert("Failed to add to cart.");
        }
    };

    if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
    if (error) return <div style={{ padding: 40, textAlign: "center", color: "red" }}>{error}</div>;
    if (!product) return <div style={{ padding: 40, textAlign: "center" }}>Product not found.</div>;

    return (
        <div className="product-details-page">
            {isAdmin ? <AdminNavbar /> : <Navbar />}

            <div className="product-details-container" style={{ maxWidth: "1200px", margin: "50px auto", padding: "0 20px" }}>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        marginBottom: "20px",
                        padding: "10px 18px",
                        cursor: "pointer",
                        background: "white",
                        border: "2px solid var(--gold-border)",
                        borderRadius: "10px",
                        color: "var(--text-dark)",
                        fontWeight: "bold",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "var(--teal)", e.target.style.color = "white")}
                    onMouseOut={(e) => (e.target.style.background = "white", e.target.style.color = "var(--text-dark)")}
                >
                    ← Back to Products
                </button>

                {/* ⭐ MAIN PRODUCT CARD */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "40px",
                        padding: "30px",
                        background: "white",
                        borderRadius: "16px",
                        border: "2px solid var(--gold-border)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        marginBottom: "60px",
                    }}
                >
                    {/* Image */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src={product.image_url ? `${import.meta.env.VITE_BACKEND_URL || "https://codealpha-ecommerce-luxecommerce.onrender.com"}/uploads/${product.image_url}` : "https://via.placeholder.com/400"}
                            alt={product.prod_name}
                            style={{
                                width: "100%",
                                borderRadius: "16px",
                                border: "2px solid var(--gold-border)",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                            }}
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <h1 style={{ fontSize: "2.7rem", fontWeight: 700, marginBottom: "10px" }}>
                            {product.prod_name}
                        </h1>

                        <p style={{ marginBottom: "15px", opacity: 0.8 }}>
                            Category: <b style={{ color: "var(--teal)" }}>{product.category_name}</b>
                        </p>

                        <h2 style={{ color: "var(--teal)", fontSize: "2.4rem", margin: "15px 0" }}>
                            ₹{price.toFixed(2)}
                        </h2>

                        <p
                            style={{
                                background: "#fafafa",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "1px solid var(--gold-border)",
                                marginBottom: "20px",
                                lineHeight: "1.6",
                            }}
                        >
                            {product.prod_desc}
                        </p>

                        <p style={{ marginBottom: "20px", opacity: 0.6, fontStyle: "italic" }}>
                            Crafted by: <b>{product.creator_name || "Unknown"}</b>
                        </p>

                        {/* Buttons */}
                        {isAdmin ? (
                            <div style={{ display: "flex", gap: "15px" }}>
                                <button
                                    onClick={handleEdit}
                                    style={{
                                        background: "var(--teal)",
                                        padding: "12px 22px",
                                        border: "none",
                                        borderRadius: "10px",
                                        color: "white",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                    }}
                                >
                                    ✏️ Edit Product
                                </button>

                                <button
                                    onClick={handleDelete}
                                    style={{
                                        background: "#ff6b6b",
                                        padding: "12px 22px",
                                        border: "none",
                                        borderRadius: "10px",
                                        color: "white",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                    }}
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        borderRadius: "10px",
                                        border: "2px solid var(--gold-border)",
                                    }}
                                >
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={qtyBtn}>-</button>
                                    <span style={{ padding: "10px 16px", fontSize: "1.2rem" }}>{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} style={qtyBtn}>+</button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    style={{
                                        background: "var(--teal)",
                                        padding: "14px 32px",
                                        borderRadius: "10px",
                                        color: "white",
                                        fontWeight: "bold",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    🛒 Add to Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Collection */}
                {similarProducts.length > 0 && (
                    <Section title={`More from ${product.category_name}`}>
                        {similarProducts.map((p) => (
                            <ProductMiniCard key={p.prod_id} p={p} isAdmin={isAdmin} navigate={navigate} />
                        ))}
                    </Section>
                )}

                {/* Recommendations */}
                <Section title="You May Also Like">
                    {otherProducts.map((p) => (
                        <ProductMiniCard key={p.prod_id} p={p} isAdmin={isAdmin} navigate={navigate} />
                    ))}
                </Section>
            </div>

            <Footer />
        </div>
    );
};

/* ---------------------------------------------------
   📌 Small Reusable Display Components
---------------------------------------------------*/
const Section = ({ title, children }) => (
    <div style={{ marginBottom: "60px" }}>
        <h2 style={{ marginBottom: "20px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>{title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {children}
        </div>
    </div>
);

const ProductMiniCard = ({ p, isAdmin, navigate }) => (
    <div
        onClick={() => navigate(isAdmin ? `/admin/product/${p.prod_id}` : `/product/${p.prod_id}`)}
        style={{
            cursor: "pointer",
            border: "2px solid var(--gold-border)",
            borderRadius: "12px",
            padding: "10px",
            background: "white",
            transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    >
        <img
            src={p.image_url ? `${import.meta.env.VITE_BACKEND_URL || "https://codealpha-ecommerce-luxecommerce.onrender.com"}/uploads/${p.image_url}` : "https://via.placeholder.com/150"}
            alt={p.prod_name}
            style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
            }}
        />
        <h4>{p.prod_name}</h4>
        <p style={{ color: "var(--teal)", fontWeight: "bold" }}>₹{p.sale_price || p.list_price}</p>
    </div>
);

export default ProductDetails;
