import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  }
);