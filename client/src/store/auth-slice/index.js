import { serverurl } from "@/config/serverurl";
import {createAsyncThunk, createSlice}  from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

let initialState = {
isLoading : false,
user : null,
isAuthenticated : false
}

//For register User

export const registerUser = createAsyncThunk('/auth/register',async(formData)=>{
    let response = await axios.post(`${serverurl}/api/auth/register`, formData,{withCredentials: true})
    return response.data;
})

// For login user
export const loginUser = createAsyncThunk('/auth/login',async(formData)=>{
    let response = await axios.post(`${serverurl}/api/auth/login`, formData,{withCredentials: true})
    return response.data;
})

//For check Auth
export const checkAuth = createAsyncThunk(
    "/auth/checkauth",
  
    async () => {
      const response = await axios.get(
        `${serverurl}/api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
  
      return response.data;
    }
  );

  //For Logout User
  export const logoutUser = createAsyncThunk(
    "/auth/logout",
  
    async () => {
      const response = await axios.post(
        `${serverurl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      return toast("Admin logout Successfully...!");
      
    }
  );

let authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        setuser(state, action){
            // 
        }
    },
    extraReducers: (builder) => {
        builder
         // register
        .addCase(registerUser.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.isAuthenticated = false
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
        // register
        // login
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            // console.log(action);
    
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
        // login
        // check auth
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
          })
          .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
       
        // check auth
        // logout
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          });
        // logout
    }
})

export const { setuser } = authSlice.actions;
export const authReducer = authSlice.reducer;