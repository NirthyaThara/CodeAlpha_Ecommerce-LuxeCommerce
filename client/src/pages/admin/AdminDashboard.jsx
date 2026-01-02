import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="admin-dashboard"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // full height
        margin: 0,
        padding: 0,
      }}
    >
      <AdminNavbar />

      <div style={{ padding: 40, textAlign: "center", flex: 1 }}> {/* flex:1 pushes footer */}
        <h1>Admin Dashboard</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>
          Welcome back, <strong>{user?.user_name}</strong>!
        </p>
        <p style={{ color: "gray", marginTop: "10px" }}>
          Use the navigation bar to manage users, products, and orders.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
