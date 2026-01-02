import axios from "../api/axiosInstance";

export const fetchCart = async () => {
    const response = await axios.get("/cart");
    return response.data;
};

export const addToCartAPI = async (prod_id, quantity = 1) => {
    const response = await axios.post("/cart", { prod_id, quantity });
    return response.data;
};

export const updateCartItemAPI = async (prod_id, quantity) => {
    const response = await axios.put("/cart", { prod_id, quantity });
    return response.data;
};

export const removeFromCartAPI = async (prod_id) => {
    const response = await axios.delete(`/cart/${prod_id}`);
    return response.data;
};

export const clearCartAPI = async () => {
    const response = await axios.delete("/cart");
    return response.data;
};
