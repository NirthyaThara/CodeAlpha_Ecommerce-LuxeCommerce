import React from "react";

const UserTable = ({ users, handleEdit, handleDelete }) => {
  return (
    <div className="table-responsive">
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* 
             If 'users' is empty or undefined, show a fallback row.
             Otherwise map through users.
          */}
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>
                  {/* Display role name instead of ID if possible, 
                        or just ID for now. 1=Admin, 2=User generally. */}
                  {user.role_id === 1 ? "Admin" : "User"}
                </td>
                <td className="action-buttons">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(user.user_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
