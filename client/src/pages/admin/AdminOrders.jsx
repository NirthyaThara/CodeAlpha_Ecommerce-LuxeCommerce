import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import { fetchAllOrdersAPI } from "../../api/ordersAPI";
import "../../App.css";

const AdminOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const data = await fetchAllOrdersAPI();
            setOrders(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-dashboard" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", margin: 0, padding: 0, boxSizing: "border-box" }}>
            <AdminNavbar />

            <div className="admin-container" style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* <button
                    onClick={() => navigate(-1)}
                    className="btn-back"
                    style={{ marginBottom: "20px", padding: "8px 16px", cursor: "pointer", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                    ← Back
                </button> */}

                <h2>All User Orders</h2>

                {loading ? (
                    <p>Loading orders...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <table className="users-table" style={{ alignItems: "center", marginBottom: 0, borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>ORD-{order.id}</td>
                                    <td>
                                        <div>{order.user_name}</div>
                                        <div style={{ fontSize: "12px", color: "#666" }}>{order.email}</div>
                                    </td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>₹{order.total_amount}</td>
                                    <td>
                                        <span className={`status-badge ${order.status?.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn-view">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default AdminOrders;
