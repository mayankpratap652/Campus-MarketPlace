const express = require("express");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../../controllers/shop/wishlist-controller");


const router = express.Router();


// ✅ Add product to wishlist
router.post("/add", addToWishlist);

// ✅ Get user’s wishlist
router.get("/:userId", getWishlist);

// ✅ Remove product from wishlist
router.delete("/:userId/:productId", removeFromWishlist);

module.exports = router;
