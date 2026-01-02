import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListTopBar from "../../../components/common/ListTopBar.jsx";
import UserTable from "../components/UserTable.jsx";
import Pagination from "../../../components/common/Pagination.jsx";
import AdminNavbar from "../../../components/AdminNavbar";
import Footer from "../../../components/Footer";
import { getAllUsers, deleteUser } from "../../../api/usersAPI";



const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // 🚨 CHECK IF LOGGED IN
    // if (!token || !user) {
    //   navigate("/users/login", { replace: true });
    //   return;
    // }

    // 🚨 ONLY ADMIN CAN ACCESS
    if (user.role_id !== 1) {
      navigate("/home", { replace: true });
      return;
    }

    loadUsers(1, "");
  }, []);

  const loadUsers = async (page = 1, searchTerm = "") => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllUsers(page, limit, searchTerm);

      if (!res || !res.data) {
        throw new Error("No data returned from server");
      }

      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);

    } catch (err) {
      console.error("❌ Error loading users:", err);

      // ❗ DO NOT REDIRECT HERE – REMOVE THIS TO STOP LOOP
      setError("Failed to load users. Check server.");

    } finally {
      setLoading(false);
    }
  };


  const handleSearch = () => {
    setCurrentPage(1);
    loadUsers(1, search.trim());
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadUsers(page, search.trim());
  };

  const handleAdd = () => navigate("/users/add");
  const handleEdit = (id) => navigate(`/users/edit/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await deleteUser(id);
    loadUsers(currentPage, search.trim());
  };

  return (
    <div className="admin-dashboard" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", margin: 0, padding: 0, boxSizing: "border-box" }}>
      <AdminNavbar />
      <div className="admin-container" style={{ padding: "20px", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", gap: "10px", flex: 1, minHeight: "100vh" }}>
        <button
          onClick={() => navigate(-1)}
          className="btn-back"
          style={{ marginBottom: "20px", padding: "8px 16px", cursor: "pointer", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "5px" }}
        >
          ← Back
        </button>
        <div className="user-table-container" style={{ margin: 0, boxShadow: "none", alignItems: "center", justifyContent: "center" }}>
          <ListTopBar
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            handleAdd={handleAdd}
            loading={loading}
            error={error}
            retry={loadUsers}
            placeholder="Search users..."
            addLabel="+ Add User"
          />

          <UserTable
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            style={{ alignItems: "center", justifyContent: "center" }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            style={{ alignItems: "center", justifyContent: "center", margin: "20px 0" }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UsersPage;
