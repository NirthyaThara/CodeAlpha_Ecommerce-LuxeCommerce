import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../api/prodAPI";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    prod_name: "",
    prod_desc: "",
    category_name: "",
    sale_price: "",
    list_price: "",
    stock: "",
    created_by: 1
  });

  const [image, setImage] = useState(null); // 📌 for uploaded file
  const [preview, setPreview] = useState(""); // 🌟 IMAGE PREVIEW URL

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryMap = {
      "Digital": 1,
      "Stationery": 2,
      "Art Supplies": 3,
      "Fashion": 4,
      "Accessories": 5,
      "Seasonal Products": 6
    };

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === 'category_name') {
        formData.append('category_id', categoryMap[form[key]] || 1);
      } else {
        formData.append(key, form[key]);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      await createProduct(formData);
      alert("Product Added Successfully");
      navigate("/products");
    } catch (err) {
      alert("Failed to add product: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add Product</h2>

      <input name="prod_name" placeholder="Name" onChange={handleChange} required />
      <input name="prod_desc" placeholder="Description" onChange={handleChange} required />
      <input name="sale_price" placeholder="Sale Price" onChange={handleChange} />
      <input name="list_price" placeholder="List Price" onChange={handleChange} required />
      <input name="stock" placeholder="Stock" onChange={handleChange} required />

      <select name="category_name" onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Digital">Digital</option>
        <option value="Stationery">Stationery</option>
        <option value="Art Supplies">Art Supplies</option>
        <option value="Fashion">Fashion</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* 📌 IMAGE UPLOAD FIELD */}
      <input type="file" name="image" accept="image/*" onChange={handleImageChange} />

      <button type="submit">Save Product</button>
      <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
        Exit
      </button>
    </form>
  );
};

export default AddProduct;
