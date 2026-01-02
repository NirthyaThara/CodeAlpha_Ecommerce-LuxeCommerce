import axiosInstance from "./axiosInstance";

const API_URL = "/users";

/* ======================
   USERS (ADMIN ONLY)
====================== */

export const getAllUsers = (page = 1, limit = 12, search = "") => {
  return axiosInstance.get(API_URL, {
    params: { page, limit, search },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  },
  );
}

export const fetchUserById = (id) =>
  axiosInstance.get(`/users/${id}`);

export const createUser = (data) =>
  axiosInstance.post("/users", data);

export const updateUser = (id, data) =>
  axiosInstance.put(`/users/${id}`, data);

export const deleteUser = (id) =>
  axiosInstance.delete(`/users/${id}`);
