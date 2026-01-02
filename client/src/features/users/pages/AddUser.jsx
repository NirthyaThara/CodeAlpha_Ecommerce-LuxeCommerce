import { useState, useEffect } from "react";
import { createUser } from "../../../api/usersAPI";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_name: "",
    email: "",
    password: "",
    role_id: 2, // default USER
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ============================
     🔐 ADMIN GUARD
  ============================ */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user || user.role_id !== 1) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  /* ============================
     📝 SUBMIT
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createUser(form);
      navigate("/users");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login", { replace: true });
      } else {
        setError(err.response?.data?.message || "Failed to create user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h2>Add User</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        placeholder="Name"
        value={form.user_name}
        onChange={(e) => setForm({ ...form, user_name: e.target.value })}
        required
      />

      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <select
        value={form.role_id}
        onChange={(e) =>
          setForm({ ...form, role_id: Number(e.target.value) })
        }
        required
        style={{ width: "100%", padding: "8px", margin: "8px 0", border: "2px solid #d3b486", borderRadius: "8px" }}
      >
        <option value={1}>Admin</option>
        <option value={2}>User</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>

      <button
        type="button"
        onClick={() => navigate("/users")}
        className="btn-cancel"
      >
        Cancel
      </button>
    </form>
  );
};

export default AddUser;
