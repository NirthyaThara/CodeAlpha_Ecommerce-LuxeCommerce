const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";
const email = `testuser_${Date.now()}@example.com`;
const password = "password123";

async function runDebug() {
    try {
        console.log("1. Registering User...");
        await axios.post(`${BASE_URL}/users/register`, {
            user_name: "Test User",
            email,
            password,
            role: "customer"
        });
        console.log("✅ Registered");

        console.log("2. Logging In...");
        const loginRes = await axios.post(`${BASE_URL}/users/login`, {
            email,
            password
        });
        const token = loginRes.data.token;
        console.log("✅ Logged In. Token:", token ? "Yes" : "No");

        const authHeader = { headers: { Authorization: `Bearer ${token}` } };

        console.log("3. Getting Products...");
        const prodRes = await axios.get(`${BASE_URL}/prod`);
        const products = prodRes.data.prods || prodRes.data;
        console.log("Products response type:", typeof products);
        console.log("Is Array:", Array.isArray(products));
        if (Array.isArray(products)) {
            console.log("Products count:", products.length);
            if (products.length > 0) console.log("First product:", products[0]);
        } else {
            console.log("Review Products Response:", products);
        }

        if (!Array.isArray(products) || products.length === 0) {
            console.error("❌ No products found to add to cart.");
            return;
        }
        const prodId = products[0].prod_id;
        console.log("✅ Found Product:", prodId);

        console.log("4. Adding to Cart...");
        await axios.post(`${BASE_URL}/cart`, { prod_id: prodId, quantity: 1 }, authHeader);
        console.log("✅ Added to Cart");

        console.log("5. Fetching Cart...");
        const cartRes = await axios.get(`${BASE_URL}/cart`, authHeader);
        const cartItems = cartRes.data;
        console.log("✅ Cart Items:", cartItems.length);

        if (cartItems.length === 0) {
            console.error("❌ Cart is empty after adding item!");
            return;
        }

        const totalAmount = cartItems.reduce((acc, item) => {
            return acc + (parseFloat(item.sale_price || item.list_price) * item.quantity);
        }, 0);

        console.log("6. Placing Order...");
        console.log("Payload:", { items: cartItems, total_amount: totalAmount });

        try {
            const orderRes = await axios.post(`${BASE_URL}/orders`, {
                items: cartItems,
                total_amount: totalAmount
            }, authHeader);
            console.log("✅ Order Placed Successfully:", orderRes.data);
        } catch (orderErr) {
            console.error("❌ Order Placement Failed Code:", orderErr.response?.status);
            console.error("❌ Order Placement Failed Data:", orderErr.response?.data);
        }

    } catch (e) {
        console.error("❌ Script Failed:", e.message);
        if (e.response) {
            console.error("Response Data:", e.response.data);
        }
    }
}

runDebug();
