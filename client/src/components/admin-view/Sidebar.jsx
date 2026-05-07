import {
  LayoutDashboard,
  ShoppingBasket,
  BadgeCheck,
  Package,
  Settings,
  LogOut,
  ChartNoAxesCombined,
} from "lucide-react";
import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <BadgeCheck className="w-5 h-5" />,
    },
  ];

  function MenuItems({ setOpen }) {
    return (
      <nav className="mt-6 flex flex-col gap-2">
        {adminSidebarMenuItems.map((menuItem) => {
          const isActive = location.pathname === menuItem.path;

          return (
            <div
              key={menuItem.id}
              onClick={() => {
                navigate(menuItem.path);
                setOpen?.(false);
              }}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold border-blue-600 shadow-sm"
                  : "text-gray-600 border-transparent hover:bg-gray-100 hover:text-blue-600 hover:border-blue-300"
              }`}
            >
              <div
                className={`transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              >
                {menuItem.icon}
              </div>
              <span className="text-sm tracking-wide">{menuItem.label}</span>
            </div>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t" />

        {/* Extra Options */}
        <div
          onClick={() => navigate("/admin/settings")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </div>

       
      </nav>
    );
  }

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full bg-white">
            <SheetHeader className="border-b p-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <SheetTitle className="flex items-center gap-2 text-lg font-bold">
                <ChartNoAxesCombined size={20} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4">
              <MenuItems setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col h-screen border-r bg-white shadow-lg">
        {/* Header */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-3 px-6 py-6 border-b cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        >
          <ChartNoAxesCombined size={28} />
          <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
        </div>

        {/* Menu */}
        <div className="flex-1 p-4">
          <MenuItems />
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;