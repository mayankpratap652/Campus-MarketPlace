// controllers/admin/dashboard-controller.js

const Orders = require("../../models/Orders");
const Product = require("../../models/Product");
const User = require("../../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Orders.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // only confirmed/paid orders ka revenue
    const revenueData = await Orders.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      success: true,
      data: {
        totalOrders,
        totalProducts,
        totalUsers,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
    });
  }
};

module.exports = { getDashboardStats };