import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Ensure styles are applied

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    const handleLogin = () => {
        navigate("/login");
    };
    const handleRegister = () => {
        navigate("/register");
    };

    const handleProtectedClick = (path) => {
        if (user) {
            navigate(path);
        } else {
            navigate("/login");
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/home">✨ LuxeCommerce</Link>
            </div>

            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>

                {/* Categories Dropdown */}
                <li
                    className="nav-item dropdown"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <span className="dropdown-trigger">Categories ▾</span>
                    {showDropdown && (
                        <ul className="dropdown-menu">
                            <li><Link to="/category/Fashion">Fashion</Link></li>
                            <li><Link to="/category/Digital">Digital</Link></li>
                            <li><Link to="/category/Stationery">Stationery</Link></li>
                            <li><Link to="/category/Art Supplies">Art Supplies</Link></li>
                            <li><Link to="/category/Accessories">Accessories</Link></li>
                        </ul>
                    )}
                </li>

                <li>
                    <span
                        onClick={() => handleProtectedClick("/cart")}
                        className="nav-link-item"
                    >
                        Cart 🛒
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => handleProtectedClick("/orders")}
                        className="nav-link-item"
                    >
                        Orders
                    </span>
                </li>
            </ul>

            <div className="nav-user">
                <span>Hello, {user?.user_name || "Guest"}</span>
                {user ? (
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={handleLogin} className="logout-btn" style={{ backgroundColor: "#91af6a" }}>Login</button>
                        <button onClick={handleRegister} className="logout-btn" style={{ backgroundColor: "#364b5f" }}>Register</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
