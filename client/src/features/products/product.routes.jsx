import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import PrivateRoute from "../auth/components/PrivateRoute";

export default [
  { path: "/products", element: <PrivateRoute adminOnly><ProductPage /></PrivateRoute> },
  { path: "/products/add", element: <PrivateRoute adminOnly><AddProduct /></PrivateRoute> },
  { path: "/products/edit/:id", element: <PrivateRoute adminOnly><EditProduct /></PrivateRoute> }
];
