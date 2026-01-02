import { useEffect, useState } from "react";
import { updateUser, fetchUserById } from "../../../api/usersAPI";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_name: "",
    email: "",
    role_id: 2,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
     📦 LOAD USER
  ============================ */
  useEffect(() => {
    const loadUser = async () => {
      try {
        setFetching(true);
        const res = await fetchUserById(id);

        if (res.data?.user) {
          setForm({
            user_name: res.data.user.user_name,
            email: res.data.user.email,
            role_id: res.data.user.role_id,
          });
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login", { replace: true });
        } else {
          setError("Failed to load user");
        }
      } finally {
        setFetching(false);
      }
    };

    if (id) loadUser();
  }, [id, navigate]);

  /* ============================
     📝 SUBMIT
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateUser(id, form);
      navigate("/users");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login", { replace: true });
      } else {
        setError("Failed to update user");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p style={{ textAlign: "center" }}>Loading user...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      <h2>Edit User</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        placeholder="Name"
        value={form.user_name}
        onChange={(e) =>
          setForm({ ...form, user_name: e.target.value })
        }
        required
      />

      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
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
        {loading ? "Updating..." : "Update"}
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

export default EditUser;
