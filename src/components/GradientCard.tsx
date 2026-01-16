import React from "react";

interface CardProps {
  gradientFrom: string; // Цвет градиента (левая часть)
  gradientTo: string; // Цвет градиента (правая часть)
  title: string; // Заголовок карточки
  description: string; // Описание карточки
}

const Card: React.FC<CardProps> = ({
  gradientFrom,
  gradientTo,
  title,
  description,
}) => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
      className="w-full  h-24 rounded-3xl p-4 flex"
    >
      <div className="w-1/4 pr-2 flex items-center">
        <div className="text-black text-base font-semibold font-hind-vadodara leading-none">
          {title}
        </div>
      </div>
      <div className="w-3/4 pl-10 flex items-center">
        <div className="text-sm font-normal font-libre-baskerville text-black opacity-70">
          {description}
        </div>
      </div>
    </div>
  );
};

export default Card;
