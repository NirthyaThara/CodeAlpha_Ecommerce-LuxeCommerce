import React from "react";
import "../pages/productStyles.css";

const ProductCards = ({ products, handleEdit, handleDelete }) => {
  if (!products.length) {
    return <p style={{ textAlign: "center" }}>No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((item) => {
        const imageSrc = item.image_url
          ? `http://localhost:5000/uploads/${item.image_url}`
          : "https://via.placeholder.com/300";

        return (
          <div className="product-card" key={item.prod_id}>
            
            {/* Offer Badge */}
            {item.sale_price && (
              <span className="offer-tag">Offer</span>
            )}

            {/* Product Image */}
            <div className="product-image">
              <img
  src={
    item.image_url
      ? `http://localhost:5000/uploads/${item.image_url}`
      : "https://via.placeholder.com/300"
  }
  alt={item.prod_name}
/>

            </div>

            {/* Product Info */}
            <div className="product-info">
              <h3 className="product-title">{item.prod_name}</h3>
              <p className="product-desc">{item.prod_desc}</p>

              <p className="product-price">
                ₹{item.sale_price || item.list_price}
              </p>

              <p className="product-category">
                {item.category_name}
              </p>
            </div>

            {/* Actions */}
            <div className="card-actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(item.prod_id)}
              >
                ✏️ Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDelete(item.prod_id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCards;
