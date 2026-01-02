import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import PrivateRoute from "../auth/components/PrivateRoute";

export default [
  { path: "/products", element: <PrivateRoute><ProductPage /></PrivateRoute> },
  { path: "/products/add", element: <PrivateRoute><AddProduct /></PrivateRoute> },
  { path: "/products/edit/:id", element: <PrivateRoute><EditProduct /></PrivateRoute> }
];
