import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`rounded-full shadow-md transition-all duration-300
            ${
              star <= rating
                ? "text-yellow-500 bg-yellow-100 hover:bg-yellow-200 hover:scale-110"
                : "text-gray-500 bg-gray-100 hover:bg-primary hover:text-white hover:scale-105"
            }`}
          variant="outline"
          size="icon"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <StarIcon
            className={`w-6 h-6 transition-colors duration-300 ${
              star <= rating ? "fill-yellow-500 text-yellow-600" : "fill-gray-400"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
