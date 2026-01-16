import * as React from "react";
import { RatingStars } from "./RatingStars";
import LeftQuote from "../assets/icons/LeftQuote";

interface Rating {
  score: number;
  total: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface RatingCardProps {
  starCount: number;
  ratings: Rating[];
  title: string;
  mode?: "dark" | "light";
}

export function RatingCard({
  starCount,
  ratings,
  title,
  mode = "dark",
}: RatingCardProps) {
  const isDarkMode = mode === "dark";

  return (
    <div
      className="flex flex-col items-center max-w-md mx-auto w-full px-2"
      role="region"
      aria-label="Rating Summary"
    >
      {/* First line: Rating stars */}
      <div className="flex items-center gap-1.5 mb-2">
        <RatingStars count={starCount} />
      </div>

      {/* Second line: Quote - Title - Quote */}
      <div className="flex items-center w-full px-2">
        {/* Left quote */}
        <div className="flex-shrink-0 w-8 md:w-10">
          <LeftQuote
            className={`w-full h-auto ${isDarkMode ? "text-gray-500" : "text-gray-700/30"
              }`}
            mode={mode}
          />
        </div>

        {/* Center text */}
        <h2
          className={`flex-grow text-center text-lg md:text-xl font-semibold font-['Hind_Vadodara'] leading-tight px-4 md:px-6 ${isDarkMode ? "text-white" : "text-black"
            }`}
        >
          {title}
        </h2>

        {/* Right quote (flipped) */}
        <div className="flex-shrink-0 w-8 md:w-10">
          <LeftQuote
            className={`w-full h-auto -scale-x-100 ${isDarkMode ? "text-gray-500" : "text-gray-700/30"
              }`}
            mode={mode}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Third line: Rating scores */}
      <div className="flex justify-center gap-8 md:gap-16">
        {ratings.map((rating, index) => (
          <div key={index} className="flex items-center">
            {/* Icon */}
            <rating.icon className="w-4 h-auto mr-2" />

            {/* Score */}
            <div className="text-center">
              <span className={`text-sm font-semibold font-['Hind_Vadodara'] ${isDarkMode ? "text-white" : "text-black"
                }`}>
                {rating.score}
              </span>
              <span className={`text-[10px] font-semibold font-['Hind_Vadodara'] ml-0.5 ${isDarkMode ? "text-white/70" : "text-black/70"
                }`}>
                /{rating.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}