import React from 'react';

interface PlanOptionButtonProps {
  title: string;
  pricePerDay: string;
  price: string;
  tagText?: string;
  discount?: string;
  emoji?: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const PlanOptionButton: React.FC<PlanOptionButtonProps> = ({
  title,
  pricePerDay,
  price,
  tagText,
  discount,
  emoji,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      className={`w-full flex items-center p-6 rounded-3xl transition-all duration-200 ${
        isSelected
          ? "bg-[#f5f5f7] ring-2 ring-black shadow-lg"
          : "bg-[#f5f5f7] hover:bg-neutral-200 hover:shadow-sm"
      }`}
      onClick={onSelect}
    >
      {emoji && (
        <span className="text-2xl mr-4">{emoji}</span>
      )}
      <div className="flex-1 text-left">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-semibold font-['Hind_Vadodara'] tracking-tighter text-black">
              {title}
            </div>
            <div className="text-xs font-normal font-['Libre_Baskerville'] mt-1 text-black/60">
              {pricePerDay}
            </div>
            {tagText && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-normal font-['Libre_Baskerville'] bg-fuchsia-100 text-black mt-2">
                {tagText}
              </span>
            )}
          </div>
          <div className="text-right ml-4">
            {discount && (
              <div className="text-xs text-black/40 line-through font-['Hind_Vadodara']">
                {parseInt(price) + parseInt(discount.replace(/[^0-9]/g, ''))} kr
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-['Hind_Vadodara'] tracking-tight text-black">
                {price}
              </span>
              <span className="text-xs text-black/60 font-['Hind_Vadodara']">
                kr/mnd
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default PlanOptionButton;