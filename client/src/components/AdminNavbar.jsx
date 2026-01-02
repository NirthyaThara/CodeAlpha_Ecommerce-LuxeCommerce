import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar admin-navbar" style={{ background: "#2c3e50" }}>
            <div className="nav-logo">
                <Link to="/admin">🛡️ Admin Panel</Link>
            </div>

            <ul className="nav-links">
                <li><Link to="/admin">Home</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
            </ul>

            <div className="nav-user">
                <span>Admin: {user?.user_name || "Admin"}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
