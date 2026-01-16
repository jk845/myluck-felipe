import React from "react";

interface RadioSelectorProps {
  isSelected: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  customColor?: string;
}

export const RadioSelector: React.FC<RadioSelectorProps> = ({
  isSelected,
  onClick,
  label,
  icon,
  customColor = "fuchsia-300"
}) => {
  return (
    <button
      type="button"
      className={`w-full flex items-center p-5 rounded-3xl transition-colors ${
        isSelected
          ? `bg-fuchsia-100 ring-2 ring-black`
          : "bg-[#f5f5f7] hover:bg-neutral-200"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-6 h-6 rounded-full mr-6 flex items-center justify-center ${
          isSelected
            ? `bg-${customColor}`
            : "bg-white"
        }`}
      >
        {isSelected && (
          <div className="w-3 h-3 bg-white rounded-full"></div>
        )}
      </div>
      <span className="text-sm font-semibold font-['Hind_Vadodara']">
        {label}
      </span>
      {icon && <span className="text-3xl ml-auto">{icon}</span>}
    </button>
  );
};

export default RadioSelector;