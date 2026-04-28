import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../features/products/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.products
  );
  const [form, setForm] = useState({
    title: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.price) {
      return;
    }

    if (editingId) {
      await dispatch(
        updateProduct({
          id: editingId,
          updatedData: {
            title: form.title.trim(),
            price: Number(form.price),
          },
        })
      );
    } else {
      await dispatch(
        addProduct({
          title: form.title.trim(),
          price: Number(form.price),
        })
      );
    }

    resetForm();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditStart = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
    });
  };

  const handleEditCancel = () => {
    resetForm();
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 16px" }}>
      <h2>Products</h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Product title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          style={{ padding: "8px", minWidth: "240px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          style={{ padding: "8px", width: "120px" }}
        />
        <button onClick={handleSubmit}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
        {editingId && (
          <button onClick={handleEditCancel}>Cancel</button>
        )}
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Title</th>
              <th style={cellStyle}>Price</th>
              <th style={cellStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.id}>
                <td style={cellStyle}>{product.id}</td>
                <td style={cellStyle}>{product.title}</td>
                <td style={cellStyle}>${product.price}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEditStart(product)}>
                    Edit
                  </button>{" "}
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
};
