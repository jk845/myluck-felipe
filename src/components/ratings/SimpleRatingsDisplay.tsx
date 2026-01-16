import { RatingStars } from "./RatingStars";
import LeftQuote from "../assets/icons/LeftQuote";
import TrustpilotIcon from "../assets/icons/TrustpilotIcon";
import GoogleIcon from "../assets/icons/GoogleIcon";

interface SimpleRatingsDisplayProps {
  mode?: "dark" | "light";
}

export function SimpleRatingsDisplay({ mode = "dark" }: SimpleRatingsDisplayProps) {
  const isDarkMode = mode === "dark";

  return (
    <div className="flex flex-col items-center w-full">
      {/* First line: Quote - Stars + Title - Quote */}
      <div className="flex items-center w-full justify-between mb-4">
        {/* Left quote */}
        <div className="flex-shrink-0 w-10">
          <LeftQuote
            className={`w-full h-auto ${isDarkMode ? "text-white/30" : "text-gray-700/30"}`}
            mode={mode}
          />
        </div>

        {/* Center: Stars + Text on same line */}
        <div className="flex flex-col items-center gap-1">
          <h2 className={`text-lg font-semibold font-['Hind_Vadodara'] text-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}>
            Hundrevis av 5-stjerners vurderinger
          </h2>
          <RatingStars count={5} />
        </div>

        {/* Right quote (flipped) */}
        <div className="flex-shrink-0 w-10">
          <LeftQuote
            className={`w-full h-auto -scale-x-100 ${isDarkMode ? "text-white/30" : "text-gray-700/30"}`}
            mode={mode}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Second line: Rating scores */}
      <div className="flex justify-center gap-20">
        {/* Trustpilot rating */}
        <div className="flex items-center gap-2">
          <TrustpilotIcon className="w-4 h-4" />
          <div className="text-center">
            <span className={`text-sm font-semibold font-['Hind_Vadodara'] ${
              isDarkMode ? "text-white" : "text-black"
            }`}>
              4.8
            </span>
            <span className={`text-[10px] font-semibold font-['Hind_Vadodara'] ${
              isDarkMode ? "text-white/70" : "text-black/70"
            }`}>
              /5
            </span>
          </div>
        </div>

        {/* Google rating */}
        <div className="flex items-center gap-2">
          <GoogleIcon className="w-4 h-4" />
          <div className="text-center">
            <span className={`text-sm font-semibold font-['Hind_Vadodara'] ${
              isDarkMode ? "text-white" : "text-black"
            }`}>
              4.7
            </span>
            <span className={`text-[10px] font-semibold font-['Hind_Vadodara'] ${
              isDarkMode ? "text-white/70" : "text-black/70"
            }`}>
              /5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}