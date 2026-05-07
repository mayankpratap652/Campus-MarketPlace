import { fetchWishlist, removeFromWishlist } from "@/store/shop/whishlist-slice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlistItems, isLoading } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user?.id]);

  function remove(productId) {
    dispatch(removeFromWishlist({ userId: user.id, productId }));
    dispatch(fetchWishlist(user.id));
    toast.success("Product removed from wishlist");
  }

  if (isLoading) {
    return (
      <p className="text-center text-gray-400 text-lg py-32 animate-pulse">
        Loading your wishlist...
      </p>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="Empty Wishlist"
          className="w-48 h-48 mb-6 animate-bounce"
        />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-400 text-lg">Start adding products you love ✨</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-500 bg-clip-text">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl overflow-hidden p-4 transition-transform duration-300 hover:shadow-2xl"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.title}
                className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-gray-500 font-bold text-lg mb-4">₹{product.price}</p>
              <button
                onClick={() => remove(product._id)}
                className="w-full py-2 px-4  bg-yellow-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
