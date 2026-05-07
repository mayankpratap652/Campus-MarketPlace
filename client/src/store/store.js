import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import AdminProductsSlice from "./admin/products-slice/index"
import shoppingProductSlice from "./shop/products-slice/index"
import shopCartSlice from './shop/cart-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shoppingOrderSlice from './shop/order-slice/index'
import wishlistSlice from './shop/whishlist-slice/index'
import adminOrderSlice from './admin/order-slice/index'
import reviewSlice  from "./shop/review-slice/index"
import dashboardReducer from "./dashboard/dashboard-slice";


export let store = configureStore({
    reducer: {
        // authentcation data store
        auth: authReducer,
        //for store the Admin Data 
        adminProducts: AdminProductsSlice,

        adminOrders :adminOrderSlice,
        //for store the shop product
        shopProducts: shoppingProductSlice,
   
        shopCart : shopCartSlice,

      shopAddress: shopAddressSlice,

      shopOrder : shoppingOrderSlice,

      shopReview: reviewSlice,
      /// for price notise data store
        wishlist: wishlistSlice,
 dashboard: dashboardReducer,


    }
})