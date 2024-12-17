import React, { useState } from "react";

interface IRatingComponentProps {
  sendRatingToParent?: (rating: number) => void;
}

const RatingComponent: React.FC<IRatingComponentProps> = ({
  sendRatingToParent,
}) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingClick = (value: number) => {
    setRating(value);
    if (sendRatingToParent) sendRatingToParent(value);
    console.log(value);
  };

  return (
    <div className="pt-6 pb-2 font-sans">
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            onClick={() => handleRatingClick(number)}
            className={`w-12 h-12 text-lg font-bold border rounded-md transition-all ${
              rating === number
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;
