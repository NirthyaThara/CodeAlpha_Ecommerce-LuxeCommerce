import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../../api/authAPI.js";

const Register = () => {
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await registerUser({ user_name, email, password });

      console.log("✅ Registration success:", res.data);

      setSuccess(res.data.message);
      setUserName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("❌ Registration failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>


      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        <input
          placeholder="Username"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
          required
          placeholder="Username"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />

        <button type="submit">Register</button>

        {/* 🔹 EXTRA LINE */}
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>


    </div>
  );
};

export default Register;
