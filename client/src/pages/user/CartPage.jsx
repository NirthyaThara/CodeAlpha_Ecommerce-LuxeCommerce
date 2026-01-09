import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fetchCart, updateCartItemAPI, removeFromCartAPI, clearCartAPI } from "../../api/cartAPI";
import { placeOrderAPI } from "../../api/ordersAPI";
import "../../App.css";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    // Load cart items
    const loadCart = async () => {
        try {
            const items = await fetchCart();
            setCartItems(items);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadCart();
        window.addEventListener("cartUpdated", loadCart); // Listen if other tabs/components update
        return () => window.removeEventListener("cartUpdated", loadCart);
    }, []);

    // Remove handler
    const handleRemove = async (id) => {
        await removeFromCartAPI(id);
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // Handle Quantity Change
    const handleQuantity = async (id, currentQty, amount) => {
        const newQty = currentQty + amount;
        if (newQty < 1) return;

        await updateCartItemAPI(id, newQty);
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // Calculate total
    const totalPrice = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.sale_price || item.list_price || 0);
        const qty = item.quantity || 1;
        return acc + price * qty;
    }, 0).toFixed(2);

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        // Debug Check
        console.log("Checking out with items:", cartItems);
        console.log("Total Price:", totalPrice);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to place an order.");
            navigate("/login");
            return;
        }

        try {
            const result = await placeOrderAPI(cartItems, totalPrice);
            console.log("Order Success:", result);
            alert("Order Confirmed! 🎉 Order ID: " + (result.orderId || "N/A"));
            // Cart is cleared by backend logic, but let's refresh UI
            loadCart();
            navigate("/orders");
        } catch (e) {
            console.error("Order failed", e);
            const msg = e.response?.data?.error || e.response?.data?.message || e.message;
            alert("Order failed: " + msg);
        }
    };

    return (
        <div className="cart-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", margin: 0, padding: 0 }}>
            <Navbar />

            <div className="user-table-container" style={{ textAlign: "center", flexGrow: 1 }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ marginBottom: "20px", padding: "8px 16px", cursor: "pointer", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                    ← Back
                </button>
                <h2>Your Shopping Cart 🛒</h2>

                {cartItems.length === 0 ? (
                    <p style={{ textAlign: "center", fontSize: "18px", margin: "40px" }}>
                        Your cart is empty.
                    </p>
                ) : (
                    <>
                        <table className="users-table" style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => {
                                    const price = parseFloat(item.sale_price || item.list_price || 0);
                                    const qty = item.quantity || 1;
                                    const backendUrl = (import.meta.env.VITE_BACKEND_URL || "https://codealpha-ecommerce-luxecommerce.onrender.com").replace(/\/api\/?$/, "");
                                    return (
                                        <tr key={item.prod_id}>
                                            <td>
                                                <img
                                                    src={item.image_url ? `${backendUrl}/uploads/${item.image_url}` : "https://via.placeholder.com/50"}
                                                    alt={item.prod_name}
                                                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </td>
                                            <td>{item.prod_name}</td>
                                            <td>₹{price.toFixed(2)}</td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                                    <button
                                                        onClick={() => handleQuantity(item.prod_id, qty, -1)}
                                                        style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #ccc", background: "#f0f0f0", cursor: "pointer" }}
                                                    >-</button>
                                                    <span>{qty}</span>
                                                    <button
                                                        onClick={() => handleQuantity(item.prod_id, qty, 1)}
                                                        style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #ccc", background: "#f0f0f0", cursor: "pointer" }}
                                                    >+</button>
                                                </div>
                                            </td>
                                            <td>₹{(price * qty).toFixed(2)}</td>
                                            <td>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleRemove(item.prod_id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <div className="cart-summary" style={{ textAlign: "right", marginTop: "20px", flexGrow: 1 }}>
                            <h3>Total: ₹{totalPrice}</h3>
                            <button
                                className="add-btn"
                                style={{ padding: "12px 24px", fontSize: "18px" }}
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CartPage;
