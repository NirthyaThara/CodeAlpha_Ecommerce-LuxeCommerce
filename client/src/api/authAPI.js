import axiosInstance from "./axiosInstance";

/* ======================
   AUTH APIs
====================== */

// 🔐 LOGIN
export const loginUser = (data) => {
  return axiosInstance.post("/users/login", data);
};

// 📝 REGISTER
export const registerUser = (data) => {
  return axiosInstance.post("/users/register", data);
};
