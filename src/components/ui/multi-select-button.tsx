import React from 'react';

interface MultiSelectButtonProps {
  label: string;
  emoji?: string;
  isSelected: boolean;
  onClick: () => void;
}

export const MultiSelectButton: React.FC<MultiSelectButtonProps> = ({
  label,
  emoji,
  isSelected,
  onClick
}) => {
  return (
    <button
      type="button"
      className={`w-full flex items-center p-6 rounded-3xl transition-all duration-200 ${
        isSelected
          ? "bg-[#f5f5f7] ring-2 ring-black shadow-lg"
          : "bg-[#f5f5f7] hover:bg-neutral-200 hover:shadow-sm"
      }`}
      onClick={onClick}
    >
      <div className="relative mr-6 flex-shrink-0">
        <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
          isSelected ? "bg-black border-black" : "bg-white border-gray-300"
        }`}>
          {isSelected && (
            <div className="flex items-center justify-center h-full">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <span className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black flex-1 text-left">
        {label}
      </span>
      {emoji && <span className="text-2xl ml-3 flex-shrink-0">{emoji}</span>}
    </button>
  );
};