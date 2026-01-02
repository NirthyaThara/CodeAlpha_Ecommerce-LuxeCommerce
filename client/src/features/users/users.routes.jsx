// src/features/users/users.routes.jsx
import UsersPage from "./pages/UsersPage";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import PrivateRoute from "../auth/components/PrivateRoute";

const usersRoutes = [
  {
    path: "/users",
    element: (
      <PrivateRoute adminOnly>
        <UsersPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/users/add",
    element: (
      <PrivateRoute adminOnly>
        <AddUser />
      </PrivateRoute>
    ),
  },
  {
    path: "/users/edit/:id",
    element: (
      <PrivateRoute adminOnly>
        <EditUser />
      </PrivateRoute>
    ),
  },
];

export default usersRoutes;
