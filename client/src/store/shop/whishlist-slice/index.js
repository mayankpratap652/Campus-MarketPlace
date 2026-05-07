import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/shop/wishlist";

const initialState = {
  isLoading: false,
  wishlistItems: [], // array of product objects
};

// ✅ Add product to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${API_URL}/add`, { userId, productId });
      // return product only
      return result.data.wishlistItem.productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Get wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_URL}/${userId}`);
      // map to array of product objects
      return result.data.wishlist.map(item => item.productId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Remove product from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${userId}/${productId}`);
      return productId; // just return removed id
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addToWishlist.pending, (state) => { state.isLoading = true; })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) state.wishlistItems.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state) => { state.isLoading = false; })

      // Fetch
      .addCase(fetchWishlist.pending, (state) => { state.isLoading = true; })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistItems = action.payload; // array of products
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.isLoading = false;
        state.wishlistItems = [];
      })

      // Remove
      .addCase(removeFromWishlist.pending, (state) => { state.isLoading = true; })
      // inside wishlistSlice extraReducers
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== action.payload
        );
      })


      .addCase(removeFromWishlist.rejected, (state) => { state.isLoading = false; });
  },
});

export default wishlistSlice.reducer;
