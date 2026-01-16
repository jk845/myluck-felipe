import React from 'react';

interface SingleSelectButtonProps {
  label: string;
  emoji?: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SingleSelectButton: React.FC<SingleSelectButtonProps> = ({
  label,
  emoji,
  isSelected,
  onClick
}) => {
  return (
    <button
      type="button"
      className={`w-full flex items-center p-6 rounded-3xl transition-all duration-200 text-left ${
        isSelected
          ? "bg-[#f5f5f7] ring-2 ring-black shadow-lg"
          : "bg-[#f5f5f7] hover:bg-neutral-200 hover:shadow-sm"
      }`}
      onClick={onClick}
    >
      <div className="relative mr-6 flex-shrink-0">
        <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
          isSelected ? "bg-black border-black" : "bg-white border-gray-300"
        }`}></div>
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        )}
      </div>
      <div className="flex-1">
        <span className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          {label}
        </span>
      </div>
      {emoji && <span className="text-2xl ml-3 flex-shrink-0">{emoji}</span>}
    </button>
  );
};