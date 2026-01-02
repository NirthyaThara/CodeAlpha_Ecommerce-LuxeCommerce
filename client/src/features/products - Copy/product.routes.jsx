import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

export default [
  { path: "/prod", element: <ProductPage /> },
  { path: "/prod/add", element: <AddProduct /> },
  { path: "/prod/edit/:id", element: <EditProduct /> }
];
