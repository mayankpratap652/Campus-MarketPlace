import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  Heart,
  HousePlug,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

import { useDispatch, useSelector } from "react-redux";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { logoutUser } from "@/store/auth-slice";
import { shoppingViewHeaderMenuItem } from "@/config";

// ================= ANNOUNCEMENT =================
function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white text-sm py-2 text-center font-medium">
      ✨ Free shipping on orders above ₹49 • New arrivals every week!
    </div>
  );
}

// ================= MENU =================
function MenuItems({ closeSheet }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  function handleNavigate(menuItem) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      menuItem.id !== "home" &&
      menuItem.id !== "products" &&
      menuItem.id !== "search"
        ? { category: [menuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter) {
      setSearchParams(`category=${menuItem.id}`);
    } else {
      navigate(menuItem.path);
    }

    closeSheet && closeSheet();
  }

  return (
    <nav className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
      {shoppingViewHeaderMenuItem.map((menuItem) => (
        <button
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="relative group text-sm font-medium text-gray-700 hover:text-yellow-600 transition"
        >
          {menuItem.label}
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
        </button>
      ))}
    </nav>
  );
}

// ================= RIGHT =================
function HeaderRightContent({ closeSheet }) {
  const [openCart, setOpenCart] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const wishlist = useSelector(
    (state) => state.wishlist?.wishlistItems || []
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex items-center gap-3">

      {/* Wishlist */}
      <Button
        onClick={() => {
          navigate("/shop/wishlist");
          closeSheet && closeSheet();
        }}
        variant="outline"
        size="icon"
        className="relative rounded-full"
      >
        <Heart className="w-5 h-5 text-pink-600" />
        {wishlist.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1">
            {wishlist.length}
          </span>
        )}
      </Button>

      {/* Cart */}
      <Button
        onClick={() => setOpenCart(true)}
        variant="outline"
        size="icon"
        className="relative rounded-full"
      >
        <ShoppingCart className="w-5 h-5 text-yellow-600" />
        {cartItems?.items?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {cartItems.items.length}
          </span>
        )}
      </Button>

      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <UserCartWrapper
          setOpenCartSheet={setOpenCart}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      {/* User */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-yellow-500 text-white">
              {user?.userName?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.userName}</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => dispatch(logoutUser())}>
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ================= MAIN HEADER =================
function ShoppingHeader() {
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b shadow-sm">

      <AnnouncementBar />

      {/* ✅ FULL WIDTH FIX */}
      <div className="flex items-center justify-between h-16 px-4 md:px-8 w-full">

        {/* LEFT - LOGO */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-5 w-5 text-yellow-600" />
          <span className="font-bold text-lg text-yellow-600">
            Campus Marketplace
          </span>
        </Link>

        {/* MOBILE */}
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[260px] p-6 space-y-6">
            <MenuItems closeSheet={() => setOpenMobile(false)} />
            <HeaderRightContent closeSheet={() => setOpenMobile(false)} />
          </SheetContent>
        </Sheet>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center justify-between flex-1 ml-8">

          {/* CENTER MENU */}
          <div className="flex justify-center flex-1">
            <MenuItems />
          </div>

          {/* RIGHT ICONS */}
          <HeaderRightContent />

        </div>

      </div>
    </header>
  );
}

export default ShoppingHeader;