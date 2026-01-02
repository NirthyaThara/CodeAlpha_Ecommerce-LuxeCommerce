import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/authAPI.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });

      console.log("✅ Login success:", res.data);

      // Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 ROLE-BASED REDIRECT (THIS FIXES EVERYTHING)
      if (res.data.user.role_id === 1) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }

    } catch (err) {
      console.error("❌ Login failed", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <h2>Login</h2> */}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
          autoComplete="email"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          name="password"
          autoComplete="current-password"
          placeholder="Password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Not registered? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
