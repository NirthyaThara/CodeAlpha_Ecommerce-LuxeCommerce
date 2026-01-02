import axios from "./axiosInstance";

const API = "/prod";

/** 📌 Get all products (with search + pagination) */
export const getAllProducts = (page = 1, limit = 12, search = "") =>
  axios.get(API, {
    params: { page, limit, search },
  });

/** 📌 Get product by ID */
export const getProductById = (id) =>
  axios.get(`${API}/${id}`);

/** 📌 Create Product (supports image upload) */
export const createProduct = (formData) =>
  axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/** 📌 Update product (also supports image if needed) */
export const updateProduct = (id, formData) =>
  axios.put(`${API}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/** 📌 Delete product */
export const deleteProduct = (id) =>
  axios.delete(`${API}/${id}`);
