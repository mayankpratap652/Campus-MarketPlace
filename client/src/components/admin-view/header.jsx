import React, { useState } from "react";
import { AlignJustify, LogOut, Bell, User } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleBellClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 mb-4 bg-white border-b shadow-sm">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          className="lg:hidden"
        >
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Page Title */}
        <h1 className="text-lg font-semibold text-gray-700 hidden sm:block">
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Notification Icon with Animation */}
        <Button
          variant="ghost"
          onClick={handleBellClick}
          className={`relative transition-all duration-300 ${
            isAnimating ? "animate-bounce" : ""
          }`}
        >
          <Bell
            className={`w-5 h-5 transition-all duration-300 ${
              isAnimating ? "text-blue-600 scale-110" : ""
            }`}
          />

          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>

          {/* Ring effect */}
          {isAnimating && (
            <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></span>
          )}
        </Button>

        {/* Profile Icon */}
        <Button variant="ghost">
          <User className="w-5 h-5" />
        </Button>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;