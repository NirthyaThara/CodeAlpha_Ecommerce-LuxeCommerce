import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../pages/productStyles.css";
import { addToCart, removeFromCart, getCart } from "../../../utils/cartUtils";
import { updateCartItemAPI, removeFromCartAPI } from "../../../api/cartAPI";

const ProductCards = ({ products, handleEdit, handleDelete, isAdmin = true }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Sync cart state
  const updateCartState = async () => {
    try {
      const items = await getCart();
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    updateCartState();
    window.addEventListener("cartUpdated", updateCartState);
    return () => window.removeEventListener("cartUpdated", updateCartState);
  }, []);

  const handleQuantityChange = async (prod_id, currentQty, amount) => {
    try {
      const newQty = currentQty + amount;
      if (newQty < 1) {
        await removeFromCartAPI(prod_id);
      } else {
        await updateCartItemAPI(prod_id, newQty);
      }
      window.dispatchEvent(new Event("cartUpdated"));
      updateCartState();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const isInCart = (id) => cartItems.some(item => item.prod_id === id);
  if (!products.length) {
    return <p style={{ textAlign: "center" }}>No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((item) => {
        const backendUrl = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || "https://codealpha-ecommerce-luxecommerce.onrender.com").replace(/\/api\/?$/, "");
        const imageSrc = item.image_url
          ? `${backendUrl}/uploads/${item.image_url}`
          : "https://via.placeholder.com/300";

        const currentItem = cartItems.find(c => c.prod_id === item.prod_id);
        const qty = currentItem ? currentItem.quantity : 1;

        return (
          <div className="product-card" key={item.prod_id}>

            {/* Offer Badge */}
            {item.sale_price && (
              <span className="offer-tag">Offer</span>
            )}

            {/* Product Image */}
            <div
              className="product-image"
              onClick={() => navigate(`/product/${item.prod_id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={imageSrc}
                alt={item.prod_name}
              />
            </div>

            {/* Product Info */}
            <div className="product-info">
              <h3
                className="product-title"
                onClick={() => navigate(`/product/${item.prod_id}`)}
                style={{ cursor: "pointer" }}
              >
                {item.prod_name}
              </h3>
              <p className="product-desc">{item.prod_desc}</p>

              <p className="product-price">
                ₹{item.sale_price || item.list_price}
              </p>
              <p className="stock">
                {item.stock > 0 ? `${item.stock} in stock` : "Out of Stock"}
              </p>

              <p className="product-category">
                {item.category_name}
              </p>
            </div>

            {/* Actions (Admin Only) */}
            {isAdmin ? (
              <div className="card-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(item.prod_id)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item.prod_id)}
                >
                  🗑 Delete
                </button>
              </div>
            ) : (
              /* User Actions (Add/Remove Cart + Quantity) */
              <div className="card-actions">
                {isInCart(item.prod_id) ? (
                  <div className="quantity-controls" style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", width: "100%" }}>
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.prod_id, qty, -1)}
                      style={{ padding: "5px 12px", borderRadius: "50%", border: "1px solid #ccc", background: "#f8f4ee", cursor: "pointer", fontWeight: "bold" }}
                    >-</button>

                    <span style={{ fontWeight: "600", fontSize: "16px" }}>
                      {qty}
                    </span>

                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.prod_id, qty, 1)}
                      style={{ padding: "5px 10px", borderRadius: "50%", border: "1px solid #ccc", background: "#f8f4ee", cursor: "pointer", fontWeight: "bold" }}
                    >+</button>
                  </div>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => addToCart(item)}
                    style={{ width: "100%" }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductCards;
