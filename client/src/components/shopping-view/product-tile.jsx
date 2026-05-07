import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/store/shop/whishlist-slice";
import { toast } from "sonner";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlistItems?.some(
    (item) => item._id === product._id
  );

  const toggleWishlist = () => {
    if (!user?.id) {
      toast.error("Please login first");
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist({ userId: user.id, productId: product._id }));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist({ userId: user.id, productId: product._id }));
      toast.success("Added to wishlist");
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto relative overflow-hidden hover:shadow-xl transition duration-300">
      
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative group">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg group-hover:scale-105 transition duration-300"
          />

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist();
            }}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition ${
              isInWishlist
                ? "bg-red-600 text-white"
                : "bg-white text-gray-600 hover:bg-red-100"
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
          </button>

          {/* Stock / Sale Badges */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500">
              Only {product?.totalStock} left
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-600">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4 space-y-2">
          {/* Title */}
          <h2 className="text-lg font-bold truncate">
            {product?.title}
          </h2>

          {/* 4 Word Description */}
         <p className="text-sm text-muted-foreground">
  {product?.description?.split(" ").slice(0, 4).join(" ")}
</p>
          {/* Category & Brand */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-semibold ${
                product?.salePrice > 0 ? "line-through text-gray-400" : "text-primary"
              }`}
            >
              ${product?.price}
            </span>

            {product?.salePrice > 0 && (
              <span className="text-lg font-bold text-green-600">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button disabled className="w-full">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add To Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;