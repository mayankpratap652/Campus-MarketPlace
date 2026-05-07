// models/Wishlist.js
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // ✅ reference User
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // ✅ reference Product
    required: true,
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
