import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { chartData } from "@/config/index";
import { getDashboardStats } from "@/store/dashboard/dashboard-slice";
import socket from "@/socket";

// ✅ correct imports from admin slice
import { addOrder, updateOrder } from "@/store/admin/order-slice";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// icons
import { ShoppingCart, DollarSign, Users, Package } from "lucide-react";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { stats } = useSelector((state) => state.dashboard);
  const { orderList } = useSelector((state) => state.adminOrders);

  // ✅ SOCKET: real-time orders
  useEffect(() => {
    const handleNewOrder = (newOrder) => {
      dispatch(addOrder(newOrder));
    };

    const handleUpdateOrder = (updatedOrder) => {
      dispatch(updateOrder(updatedOrder));
    };

    socket.on("newOrder", handleNewOrder);
    socket.on("orderConfirmed", handleUpdateOrder);

    return () => {
      socket.off("newOrder", handleNewOrder);
      socket.off("orderConfirmed", handleUpdateOrder);
    };
  }, [dispatch]);

  // ✅ fetch dashboard stats
  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  // ✅ refresh stats on socket event
  useEffect(() => {
    socket.on("dashboardUpdate", () => {
      dispatch(getDashboardStats());
    });

    return () => socket.off("dashboardUpdate");
  }, [dispatch]);

  // 🔥 dashboard cards
  const dashboardCards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <ShoppingCart size={22} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      icon: <DollarSign size={22} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Products",
      value: stats?.totalProducts || 0,
      icon: <Package size={22} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Customers",
      value: stats?.totalUsers || 0,
      icon: <Users size={22} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* 🔥 Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((item, index) => (
          <Card
            key={index}
            className="rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </h2>
              </div>

              <div
                className={`p-3 rounded-xl flex items-center justify-center ${item.color}`}
              >
                {item.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🔥 Revenue Chart */}
      <div className="mt-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Revenue Overview
          </h2>

          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
            Live Data
          </span>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>

            <defs>
              <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#revenueColor)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 Orders Table */}
      <div className="w-full mt-10 bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-3 text-left">Order</th>
                <th className="py-3 text-left">Customer</th>
                <th className="py-3 text-left">Amount</th>
                <th className="py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {orderList && orderList.length > 0 ? (
                orderList.slice(0, 5).map((orderItem) => (
                  <tr
                    key={orderItem?._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 font-medium text-gray-800">
                      {orderItem?._id?.slice(0, 6)}....
                    </td>

                    <td className="py-3 text-gray-600">
                      {orderItem?.user?.name || "Guest"}
                    </td>

                    <td className="py-3 font-semibold text-gray-800">
                      ${orderItem?.totalAmount || 0}
                    </td>

                    <td className="py-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          orderItem.orderStatus === "confirmed"
                            ? "bg-green-100 text-green-600"
                            : orderItem.orderStatus === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {orderItem.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;