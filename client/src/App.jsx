import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import AdminFeatures from './pages/admin-view/features';
import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import PaymentSuccess from './pages/shopping-view/payment-success';
import PaymentReturnPage from './pages/shopping-view/payment-return';
import ShoppingBlog from './components/shopping-view/blogpage';
import ShoppingBlog2 from './components/shopping-view/blogpage2';
import ShoppinBlog3 from './components/shopping-view/blog-page3';
import WishlistPage from './pages/shopping-view/wishlist';


function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // ✅ Replaced Skeleton with a fullscreen clean loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <img
          src="https://cdn-icons-gif.flaticon.com/17905/17905699.gif"
          alt="Loading..."
          className="w-24 h-24"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white min-h-screen">
      {/* ✅ Placeholder header removed – replace with <MainHeader /> later if needed */}
<Routes>
        {/* ✅ Redirects to default routes for clean UX */}
         <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
      
        {/* ✅ Redirects to default routes for clean UX */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/auth" element={<Navigate to="/auth/login" />} />
        <Route path="/shop" element={<Navigate to="/shop/home" />} />

        {/* 🔐 Auth Routes */}
        <Route
          path="/auth/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* 🛠️ Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* 🛍️ Shop Routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path= "paypal-return" element={<PaymentSuccess/>}/>
          <Route path="paypal-cancel" element={<PaymentReturnPage/>}/>
          <Route path="wishlist" element={<WishlistPage  />} />
          <Route path='blog' element={<ShoppingBlog/>}/>
          <Route path='blog2' element={<ShoppingBlog2/>}/>
          <Route path = 'blog3'  element={<ShoppinBlog3/>}/>
        </Route>

        {/* 🚫 Unauthorized & 404 */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
