import React from "react";

interface SuccessIconProps {
  icon: string;
  bgColor?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export const SuccessIcon: React.FC<SuccessIconProps> = ({
  icon,
  bgColor = "bg-violet-50",
  size = "large",
  className = ""
}) => {
  let sizeClasses = "w-24 h-24"; // large is default
  
  if (size === "small") {
    sizeClasses = "w-10 h-10";
  } else if (size === "medium") {
    sizeClasses = "w-16 h-16";
  }

  return (
    <div className={`${sizeClasses} ${bgColor} rounded-full flex items-center justify-center ${className}`}>
      <span className={`text-${size === "small" ? "2xl" : "4xl"}`}>{icon}</span>
    </div>
  );
};

export default SuccessIcon;