import * as React from "react";

interface RatingScoreProps {
  score: number;
  total: number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  mode?: "light" | "dark"; // Добавляем пропс mode
}

export function RatingScore({
  score,
  total,
  Icon,
  mode = "light",
}: RatingScoreProps) {
  const textColor = mode === "dark" ? "text-white" : "text-black"; // Определяем цвет текста

  return (
    <div className="flex flex-1 gap-2 items-center">
      <Icon
        className="object-contain shrink-0 aspect-[0.83] w-[15px]"
        aria-hidden="true"
        mode={mode}
      />
      <div className="flex items-baseline">
        <span
          aria-label={`Rating ${score} out of ${total}`}
          className={textColor}
        >
          {score}
          <span className={`text-xs ${textColor}`}>/{total}</span>
        </span>
      </div>
    </div>
  );
}
