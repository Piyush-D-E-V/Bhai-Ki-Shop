import React from 'react';

interface StarRatingProps {
  reviews?: { rating: number }[];
}

export default function StarRating({ reviews }: StarRatingProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex items-center gap-1 my-1">
        <span className="text-gray-300 text-sm">★★★★★</span>
        <span className="text-xs text-gray-500">(0)</span>
      </div>
    );
  }

  const average = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
  const roundedAverage = Math.round(average * 10) / 10;
  const fullStars = Math.floor(average);
  const hasHalfStar = average % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 my-1">
      <div className="flex text-yellow-500 text-sm">
        {"★".repeat(fullStars)}
        {hasHalfStar && <span className="relative">
          <span className="absolute overflow-hidden w-1/2">★</span>
          <span className="text-gray-300">★</span>
        </span>}
        <span className="text-gray-300">{"★".repeat(emptyStars)}</span>
      </div>
      <span className="text-xs text-blue-600 hover:underline dark:text-blue-400">
        {roundedAverage} ({reviews.length})
      </span>
    </div>
  );
}