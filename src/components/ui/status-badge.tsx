import React from "react";

interface StatusBadgeProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  className?: string; // Добавляем опциональный параметр className
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  text,
  bgColor = "bg-fuchsia-100",
  textColor = "text-black",
  className = "" // Устанавливаем пустую строку как значение по умолчанию
}) => {
  return (
    <div className={`inline-block tracking-tighter px-2 py-1 ${bgColor} rounded-full ${className}`}>
      <span className={`text-sm font-normal tracking-tighter font-['Libre_Baskerville'] ${textColor}`}>{text}</span>
    </div>
  );
};

export default StatusBadge;