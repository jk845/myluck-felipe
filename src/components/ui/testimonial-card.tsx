import React from "react";
import { RatingStars } from "@/components/ratings/RatingStars";

interface TestimonialCardProps {
  title: string;
  text: string;
  author: string;
  source: string;
  rating?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  title,
  text,
  author,
  source,
  rating = 5
}) => {
  return (
    <div className="bg-[#f5f5f7] rounded-3xl p-7 sm:p-6 flex flex-col justify-between min-h-[200px] sm:min-h-[300px]">
      <div className="flex justify-between pb-4 pt-2">
        <div className="w-[259px] justify-start text-black text-lg font-bold font-['Libre_Baskerville']">
          {title}
        </div>
        <RatingStars count={rating} />
      </div>

      <p className="text-black tracking-tighter text-sm font-normal font-libre-baskerville mb-4">
        {text}
      </p>
      <div>
        <div className="text-black tracking-tighter text-base sm:text-lg font-semibold font-hind-vadodara">
          {author}
        </div>
        <div className="text-black/60 tracking-tighter text-xs sm:text-sm font-semibold font-hind-vadodara">
          {source}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;