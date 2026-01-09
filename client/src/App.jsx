import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import ProductDetails from "./pages/ProductDetails";
import UserHome from "./pages/user/UserHome";

import authRoutes from "./features/auth/auth.routes";
import usersRoutes from "./features/users/users.routes";
import productRoutes from "./features/products/product.routes";

import CartPage from "./pages/user/CartPage";
import CategoryPage from "./pages/user/CategoryPage";
import OrdersPage from "./pages/user/OrdersPage";
import About from "./pages/user/About";


import PrivateRoute from "./features/auth/components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Auth routes */}
        {authRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders/all"
          element={
            <PrivateRoute allowedRoles={[1]}>
              <AdminOrders />
            </PrivateRoute>
          }
        />

        <Route
          path="/home"
          element={
            <UserHome />
          }
        />

        <Route
          path="/product/:id"
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <ProductDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PrivateRoute allowedRoles={[2]}>
              <About />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute allowedRoles={[2]}>
              <CartPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/category/:category"
          element={
            <PrivateRoute allowedRoles={[2]}>
              <CategoryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute allowedRoles={[2]}>
              <OrdersPage />
            </PrivateRoute>
          }
        />

        {/* Admin-only users routes */}
        {usersRoutes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            element={
              <PrivateRoute allowedRoles={[1]}>
                {route.element}
              </PrivateRoute>
            }
          />
        ))}

        {/* Admin-only product routes */}
        {productRoutes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            element={
              <PrivateRoute allowedRoles={[1]}>
                {route.element}
              </PrivateRoute>
            }
          />
        ))}

        {/* Catch all */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
