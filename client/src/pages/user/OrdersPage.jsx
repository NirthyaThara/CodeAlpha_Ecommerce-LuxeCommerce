import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fetchOrdersAPI } from "../../api/ordersAPI";
import "../../App.css";

const OrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await fetchOrdersAPI();
                setOrders(data);
            } catch (err) {
                console.error("Error loading orders:", err);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div
            className="orders-page"
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
            }}
        >
            <Navbar />

            {/* ✅ FIX: Make this container fill the space properly */}
            <div
                className="user-table-container"
                style={{
                    flex: 1,
                    display: "flex",          // ✅ added
                    flexDirection: "column",  // ✅ added
                    padding: "20px",
                    gap: "10px",              // optional: better spacing
                }}
            >
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        alignSelf: "flex-start",
                        padding: "8px 16px",
                        cursor: "pointer",
                        background: "#f0f0f0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    ← Back
                </button>

                <h2 style={{ margin: 0 }}>My Orders 📦</h2> {/* ❌ removed bottom margin */}

                {orders.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "40px" }}>
                        No past orders found.
                    </p>
                ) : (
                    <table
                        className="users-table"
                        style={{
                            marginBottom: 0,           // ❌ ensures no gap below table
                            borderCollapse: "collapse", // ❌ prevents spacing
                            width: "100%",              // ensures no overflow
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const date = order.created_at
                                    ? new Date(order.created_at).toLocaleDateString()
                                    : order.date;
                                const id = order.order_id || order.id;
                                return (
                                    <tr key={id}>
                                        <td>ORD-{id}</td>
                                        <td>{date}</td>
                                        <td>₹{order.total || order.total_amount}</td>
                                        <td>
                                            <span
                                                style={{
                                                    padding: "5px 10px",
                                                    borderRadius: "12px",
                                                    background:
                                                        order.status === "Delivered"
                                                            ? "#d4edda"
                                                            : "#fff3cd",
                                                    color:
                                                        order.status === "Delivered"
                                                            ? "#155724"
                                                            : "#856404",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-edit" style={{ fontSize: "14px" }}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* ❌ No inline styling needed here */}
            <Footer />
        </div>
    );
};

export default OrdersPage;
