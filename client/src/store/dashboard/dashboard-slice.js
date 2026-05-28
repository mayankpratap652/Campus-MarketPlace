// dashboard-slice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats",
  async () => {
    const res = await axios.get(
      "https://campus-marketplace-0eju.onrender.com/api/admin/dashboard/stats"
    );
    return res.data.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      });
  },
});

export default dashboardSlice.reducer;       