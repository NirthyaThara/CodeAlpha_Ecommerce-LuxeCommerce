// import React from "react";

// const UserTopBar = ({
//   search,
//   setSearch,
//   handleSearch,
//   handleAdd,
//   loading,
//   error,
//   loadUsers
// }) => {
//   return (
//     <div className="user-top-container">

//       <div className="top-bar">
//         <div className="search-box">
//           <input
//             className="search-input"
//             type="text"
//             value={search}
//             placeholder="Search user..."
//             onChange={(e) => setSearch(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />

//           <button className="search-btn" onClick={handleSearch}>
//             Search
//           </button>

//           <button className="add-btn" onClick={handleAdd}>
//             + Add User
//           </button>
//         </div>
//       </div>

//       {loading && <p className="loading-text">Loading users...</p>}
//       {error && (
//         <div className="error-box">
//           <strong>Error:</strong> {error}
//           <br />
//           <button className="retry-btn" onClick={loadUsers}>
//             Retry
//           </button>
//         </div>
//       )}

//     </div>
//   );
// };

// export default UserTopBar;


import React from "react";

const ListTopBar = ({
  search,
  setSearch,
  handleSearch,
  handleAdd,
  loading,
  error,
  retry,
  placeholder = "Search...",
  addLabel = "+ Add"
}) => {
  return (
    <div className="user-top-container">
      <div className="top-bar">
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            value={search}
            placeholder={placeholder}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          <button className="add-btn" onClick={handleAdd}>
            {addLabel}
          </button>
        </div>
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
          <br />
          <button className="retry-btn" onClick={retry}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ListTopBar;
