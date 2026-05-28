import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
  error: null, // ✅ added for debugging
};

// ✅ GET ALL ORDERS
export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://campus-marketplace-0eju.onrender.com/api/admin/orders/get`
      );

      console.log("API RESPONSE:", response.data); // ✅ DEBUG

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ GET ORDER DETAILS
export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://campus-marketplace-0eju.onrender.com/api/admin/orders/details/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ UPDATE ORDER STATUS
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://campus-marketplace-0eju.onrender.com/api/admin/orders/update/${id}`,
        { orderStatus }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,

  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },

    // ✅ REAL-TIME ADD ORDER
    addOrder: (state, action) => {
      state.orderList.unshift(action.payload);
    },

    // ✅ REAL-TIME UPDATE ORDER
    updateOrder: (state, action) => {
      state.orderList = state.orderList.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
    },
  },

  extraReducers: (builder) => {
    builder
      // GET ALL ORDERS
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log("PAYLOAD:", action.payload); // ✅ DEBUG

        // ⚠️ safe check
        state.orderList = action.payload?.data || [];
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload;
        console.log("ERROR:", action.payload);
      })

      // GET ORDER DETAILS
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.data || null;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails, addOrder, updateOrder } =
  adminOrderSlice.actions;

export default adminOrderSlice.reducer;