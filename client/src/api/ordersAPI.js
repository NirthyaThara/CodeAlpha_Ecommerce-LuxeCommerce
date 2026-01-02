import axios from "../api/axiosInstance";

export const placeOrderAPI = async (items, total_amount) => {
    const response = await axios.post("/orders", { items, total_amount });
    return response.data;
};

export const fetchOrdersAPI = async () => {
    const response = await axios.get("/orders");
    return response.data;
};

export const fetchAllOrdersAPI = async () => {
    const response = await axios.get("/orders/all");
    return response.data;
};
