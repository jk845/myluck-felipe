import React from "react";

interface SelectionCardProps {
  title: string;
  description: string | React.ReactNode;
  price?: string;
  secondaryText?: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  badge?: {
    text: string;
    bgColor?: string;
  };
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  price,
  secondaryText,
  isSelected,
  onClick,
  disabled = false,
  badge
}) => {
  return (
    <div className="mb-2">
      {badge && (
        <div className={`${badge.bgColor || 'bg-fuchsia-100'} h-10 rounded-t-[20px] flex items-center justify-center`}
        >
          <span className="text-sm font-normal font-['Libre_Baskerville']">{badge.text}</span>
        </div>
      )}

      <div
        className={`p-5 ${badge ? 'rounded-[20px] rounded-t-none' : 'rounded-[20px]'} bg-[#f5f5f7]
          ${isSelected && !disabled
            ? 'ring-2 ring-black shadow-lg'
            : ''
          }`}
        onClick={disabled ? undefined : onClick}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      >
        <div className="flex justify-between items-center mb-0">
          <div>
            <h2 className="text-xl tracking-tighter font-semibold font-['Hind_Vadodara']">
              {title}
            </h2>
            {secondaryText && !disabled && (
              <div className="inline-block tracking-tighter px-2 py-1 bg-fuchsia-100 rounded-full text-sm font-normal font-['Libre_Baskerville']">
                {secondaryText}
              </div>
            )}
          </div>

          {disabled && (
            <div className="inline-block tracking-tighter px-2 py-1 bg-fuchsia-100 rounded-full text-sm font-normal font-['Libre_Baskerville'] self-start mt-1">
              Kommer snart
            </div>
          )}
        </div>

        {price && (
          <p className="text-base tracking-tighter font-semibold font-['Hind_Vadodara'] mb-2">
            {price}
          </p>
        )}

        <div className="text-black tracking-tighter text-opacity-60 text-xs font-normal font-['Libre_Baskerville']">
          {description}
        </div>
      </div>
    </div>
  );
};

export default SelectionCard;