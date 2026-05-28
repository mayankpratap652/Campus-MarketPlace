import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner"; // ✅ assuming you use sonner for toasts

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

// Helper to extract backend error message
const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || "Something went wrong";
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity },) => {
    try {
      const response = await axios.post(
        "https://campus-marketplace-0eju.onrender.com/api/shop/cart/add",
        { userId, productId, quantity }
      );
      return response?.data;
    } catch (error) {
      console.log(error);

    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId,) => {
    try {
      const response = await axios.get(
        `https://campus-marketplace-0eju.onrender.com/api/shop/cart/get/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);

    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(
        `https://campus-marketplace-0eju.onrender.com/api/shop/cart/${userId}/${productId}`
      );
      return response.data;
    }
    catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://campus-marketplace-0eju.onrender.com/api/shop/cart/update-cart",
        { userId, productId, quantity }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
  setOpenCartSheet : (state) => {
      state.cartItems = null;

  }
}
,
  extraReducers: (builder) => {
    builder
      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
        toast.success(action.payload.message || "Item added to cart!");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to add to cart");
      })

      // FETCH CART
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch cart items");
      })

      // UPDATE CART QUANTITY
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
        toast.success("Cart quantity updated!");
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to update cart");
      })

      // DELETE CART ITEM
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
   .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;

          toast.success("Item removed from cart");
      })




      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to remove item");
      });
  },
});

export default shoppingCartSlice.reducer;
