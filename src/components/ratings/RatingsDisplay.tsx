import { RatingCard } from "./RatingCard";
import GoogleIcon from "../assets/icons/GoogleIcon";
import TrustpilotIcon from "../assets/icons/TrustpilotIcon";
import React from "react";

export function RatingsDisplay({ mode, title = `Trening og mat plan som faktisk funker!
Lagd for travle kvinner` }: { mode: "dark" | "light", title?: string }) {
  const ratingData = {
    starCount: 5,
    title,
    ratings: [
      {
        score: 4.8,
        total: 5,
        icon: TrustpilotIcon as React.FC<React.SVGProps<SVGSVGElement>>, // Уточнение типа
      },
      {
        score: 4.7,
        total: 5,
        icon: GoogleIcon as React.FC<React.SVGProps<SVGSVGElement>>, // Уточнение типа
      },
    ],
  };

  return (
    <RatingCard
      mode={mode}
      starCount={ratingData.starCount}
      ratings={ratingData.ratings}
      title={ratingData.title}
    />
  );
}
