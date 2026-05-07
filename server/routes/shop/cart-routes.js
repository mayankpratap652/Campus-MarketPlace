let express = require("express");
const { addToCart, updateCartItemQty, fetchCartItems, deleteCartItem } = require("../../controllers/shop/cart-controller");

let router = express.Router()

router.post("/add", addToCart );
router.put("/update-cart",updateCartItemQty)
router.get("/get/:userId", fetchCartItems)
router.delete("/:userId/:productId", deleteCartItem)

module.exports = router;