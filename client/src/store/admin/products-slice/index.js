import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState= {
  isLoading: false,
  productList: [],
};

let client_url = "https://campus-marketplace-0eju.onrender.com"


// for adding the product 

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      `${client_url}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    return result?.data.data; 
  }
);
//createASyncThunk call this link ( /products/fetchAllProducts ) for store the data 

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      `${client_url}/api/admin/products/get`
    );

    return result?.data;
  }
);

//for update the product

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${client_url}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

//for deleting the product 

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${client_url}/api/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  builder
    .addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    })
    .addCase(fetchAllProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
 
   })
  .addCase(addNewProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addNewProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList.push(action.payload); // ✅ append new product
    })
    .addCase(addNewProduct.rejected, (state) => {
      state.isLoading = false;
    });

}

});

export default AdminProductsSlice.reducer;