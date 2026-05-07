import { Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import StarRatingComponent from "../common/star-rating";
import { Label } from "@/components/ui/label";
import { addToWishlist, removeFromWishlist } from "@/store/shop/whishlist-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  // Close dialog
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  // Add to cart
  const handleAddToCart = (id, stock) => {
    const items = cartItems.items || [];
    const existing = items.find((item) => item.productId === id);

    if (existing && existing.quantity + 1 > stock) {
      toast("Stock limit reached");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: id,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        toast("Product added to cart!");
        dispatch(fetchCartItems(user?.id));
      } else {
        toast("Failed to add to cart");
      }
    });
  };

  // Wishlist toggle
  const handleWishlistToggle = (id) => {
    const exists = wishlistItems?.some((item) => item._id === id);

    if (exists) {
      dispatch(removeFromWishlist({ userId: user?.id, productId: id }));
      toast("Removed from Wishlist");
    } else {
      dispatch(addToWishlist({ userId: user?.id, productId: id }));
      toast("Added to Wishlist");
    }
  };

  // Rating change
  function handleRatingChange(value) {
    setRating(value);
  }

  // Add review
  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast("Review Added Successfully!");
      } else {
        toast("Review Not Added!");
      }
    });
  }

  // Fetch reviews
  useEffect(() => {
    if (productDetails?._id) {
      dispatch(getReviews(productDetails._id));
    }
  }, [productDetails]);

  // Average rating
  const averageReview =
    reviews?.length > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
      : 0;

  const inWishlist = wishlistItems?.some(
    (item) => item._id === productDetails?._id
  );

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="w-full max-w-3xl lg:max-w-5xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto rounded-2xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* IMAGE */}
          <div className="w-full aspect-square relative">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="w-full h-full object-cover rounded-xl shadow-md"
            />

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white shadow-md"
              onClick={() => handleWishlistToggle(productDetails?._id)}
            >
              <Heart
                className={`w-6 h-6 ${
                  inWishlist ? "text-red-500 fill-red-500" : "text-gray-500"
                }`}
              />
            </Button>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-5">

            <h1 className="text-2xl font-bold">
              {productDetails?.title}
            </h1>

            <p className="text-gray-600">
              {productDetails?.description}
            </p>

            {/* PRICE */}
            <div className="flex gap-3 text-xl">
              <span
                className={`${
                  productDetails?.salePrice > 0
                    ? "line-through opacity-50"
                    : ""
                }`}
              >
                ₹{productDetails?.price}
              </span>

              {productDetails?.salePrice > 0 && (
                <span className="text-green-600 font-bold">
                  ₹{productDetails?.salePrice}
                </span>
              )}
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <StarRatingComponent rating={averageReview} />
              <span>({averageReview.toFixed(1)})</span>
            </div>

            {/* CART */}
            <Button
              onClick={() =>
                handleAddToCart(
                  productDetails?._id,
                  productDetails?.totalStock
                )
              }
              disabled={productDetails?.totalStock === 0}
            >
              {productDetails?.totalStock === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>

            <hr />

            {/* REVIEWS */}
            <div className="max-h-[220px] overflow-y-auto">
              <h2 className="font-bold mb-3">Reviews</h2>

              {reviews?.length > 0 ? (
                reviews.map((r) => (
                  <div key={r._id} className="flex gap-3 mb-4">
                    <Avatar>
                      <AvatarFallback>
                        {r?.userName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-semibold">{r?.userName}</p>
                      <StarRatingComponent rating={r?.reviewValue} />
                      <p className="text-sm text-gray-500">
                        {r?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet</p>
              )}
            </div>

            {/* ADD REVIEW */}
            <div>
              <Label>Write a review</Label>

              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />

              <div className="flex gap-2 mt-2">
                <Input
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Write review..."
                />

                <Button
                  onClick={handleAddReview}
                  disabled={!reviewMsg.trim()}
                >
                  Submit
                </Button>
              </div>
            </div>

          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;