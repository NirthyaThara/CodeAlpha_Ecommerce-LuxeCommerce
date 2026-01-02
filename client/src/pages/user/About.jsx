import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../App.css";

const About = () => {
    return (
        <div className="user-dashboard" style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            margin: 0,
            padding: 0
        }} >
            <Navbar />
            <div className="about-section" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", textAlign: "center", flexGrow: 1 }}>
                <h1>About LuxeCommerce</h1>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}>
                    Welcome to LuxeCommerce, your premier destination for luxury and quality.
                    We are dedicated to providing you with the very best of products, with an emphasis
                    on quality, aesthetics, and customer service.
                </p>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555", marginTop: "20px" }}>
                    Founded in 2024, LuxeCommerce has come a long way from its beginnings.
                    When we first started out, our passion for "eco-friendly, high-end products"
                    drove us to start our own business.
                </p>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555", marginTop: "20px" }}>
                    We hope you enjoy our products as much as we enjoy offering them to you.
                    If you have any questions or comments, please don't hesitate to contact us.
                </p>

                <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                    <h3>Our Mission</h3>
                    <p>To deliver quality and luxury to your doorstep with just a click.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
