import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../../api/prodAPI";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    prod_name: "",
    prod_desc: "",
    sale_price: "",
    list_price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);       // new uploaded image
  const [preview, setPreview] = useState("");     // preview url
  const [loading, setLoading] = useState(true);

  // 📌 Load product safely
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProductById(id);

        // ⚠️ Adjust if backend response shape differs
        const product = res.data.prod || res.data;

        setForm({
          prod_name: product.prod_name || "",
          prod_desc: product.prod_desc || "",
          sale_price: product.sale_price || "",
          list_price: product.list_price || "",
          stock: product.stock || "",
        });

        // existing image preview
        if (product.image) {
          setPreview(`${import.meta.env.VITE_BACKEND_URL || "https://codealpha-ecommerce-luxecommerce.onrender.com"}/uploads/${product.image}`);
        }

        setLoading(false);
      } catch (err) {
        alert("Failed to load product");
        navigate("/prod");
      }
    };

    load();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 📸 Image change + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 📌 Submit update (multipart/form-data)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) formData.append("image", image);

    await updateProduct(id, formData);
    alert("Product Updated");
    navigate("/products");
  };

  // ⏳ Prevent crash before data loads
  if (loading) return <p>Loading product...</p>;

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Edit Product</h2>

      <input
        name="prod_name"
        value={form.prod_name}
        onChange={handleChange}
        required
      />

      <input
        name="prod_desc"
        value={form.prod_desc}
        onChange={handleChange}
        required
      />

      <input
        name="sale_price"
        value={form.sale_price}
        onChange={handleChange}
      />

      <input
        name="list_price"
        value={form.list_price}
        onChange={handleChange}
        required
      />

      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        required
      />

      {/* 📌 Image upload */}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* 👀 Image preview */}
      {preview && (
        <div style={{ margin: "10px 0" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "160px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>
      )}

      <button type="submit">Update Product</button>

      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{ marginLeft: "10px" }}
      >
        Exit
      </button>
    </form>
  );
};

export default EditProduct;
