const axios = require("axios");

const API_URL = "http://localhost:5000/api";

const testOrderFlow = async () => {
    try {
        console.log("🚀 Starting Order Verification...");

        // 1. Login
        console.log("1️⃣ Logging in...");
        const loginRes = await axios.post(`${API_URL}/users/login`, {
            email: "test@test.com",
            password: "123"
        });
        const token = loginRes.data.token;
        console.log("✅ Login Successful. Token obtained.");

        const headers = { Authorization: `Bearer ${token}` };

        // 2. Add to Cart
        console.log("2️⃣ Adding item to cart...");
        // Assuming prod_id 1 exists (it should if seed data is there, otherwise we might fail here)
        // Let's first get products to find a valid ID
        const prodRes = await axios.get(`${API_URL}/prod`);
        if (prodRes.data.length === 0) throw new Error("No products found in DB");

        const prodId = prodRes.data[0].prod_id;
        await axios.post(`${API_URL}/cart`, { prod_id: prodId, quantity: 1 }, { headers });
        console.log(`✅ Added product ${prodId} to cart.`);

        // 3. Place Order
        console.log("3️⃣ Placing Order...");
        const orderRes = await axios.post(`${API_URL}/orders`, {
            items: [{ prod_id: prodId, quantity: 1, sale_price: 100 }], // Mock items payload
            total_amount: 100
        }, { headers });

        console.log("✅ Order Placed Successfully!");
        console.log("Order ID:", orderRes.data.orderId);

    } catch (error) {
        console.error("❌ Test Failed:", error.response ? error.response.data : error.message);
    }
};

setTimeout(testOrderFlow, 5000); // Wait 5s for server to start
