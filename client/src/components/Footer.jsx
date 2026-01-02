import React from "react";

const Footer = () => {
    return (
        <footer className="footer" style={{ margin: 0, padding: "20px" }}>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} LuxeCommerce. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
