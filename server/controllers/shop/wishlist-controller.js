const mongoose = require("mongoose");
const Product = require("../../models/Product");
const Wishlist = require("../../models/Wishlist");



// Add to wishlist

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("Incoming wishlist add:", req.body);

    // Validation
    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid userId or productId" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    // Prevent duplicate entries
    const existing = await Wishlist.findOne({ userId, productId });
    if (existing) {
      return res.status(200).json({ message: "Already in wishlist", wishlist: existing });
    }

    const wishlistItem = await Wishlist.create
      (
        {
          userId, productId
        }
      );
    res.status(201).json({ success: true, message: "Item added Successfully!", wishlistItem });
  } catch (error) {
    console.error("Error adding to wishlist", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    // Find all wishlist items for this user
    const wishlist = await Wishlist.find({ userId }).populate("productId"); // find all
    res.json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist
    });
    // ✅ now an array

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};



// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const deleted = await Wishlist.findOneAndDelete({ userId, productId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Item not found in wishlist" });
    }
    res.json({ success: true, message: "Removed from wishlist" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = { addToWishlist, getWishlist, removeFromWishlist }
