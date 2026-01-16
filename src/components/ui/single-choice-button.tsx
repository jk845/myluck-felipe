import React from 'react';

interface SingleChoiceButtonProps {
  label: string;
  description?: string;
  emoji?: string;
  isSelected: boolean;
  onClick: () => void;
  emojiPosition?: 'left' | 'right';
}

export const SingleChoiceButton: React.FC<SingleChoiceButtonProps> = ({
  label,
  description,
  emoji,
  isSelected,
  onClick,
  emojiPosition = 'left'
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
      {emoji && emojiPosition === 'left' && (
        <span className="text-2xl mr-4">{emoji}</span>
      )}
      
      <div className="flex-1 text-left">
        <div className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
          {label}
        </div>
        {description && (
          <div className="text-xs font-normal font-['Libre_Baskerville'] mt-1 text-black/60">
            {description}
          </div>
        )}
      </div>
      
      {emoji && emojiPosition === 'right' && (
        <span className="text-2xl ml-4">{emoji}</span>
      )}
    </button>
  );
};