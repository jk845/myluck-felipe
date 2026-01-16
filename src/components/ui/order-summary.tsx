import React from "react";

interface OrderSummaryProps {
  subscriptionType: string;
  subscriptionPlan: string;
  price: string;
  pricePerDay?: string;
  showStrikethrough?: boolean;
  strikethroughPrice?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subscriptionType,
  subscriptionPlan,
  price,
  pricePerDay,
  showStrikethrough = false,
  // strikethroughPrice = "890 kr"
}) => {
  return (
    <div className="w-full bg-neutral-100  rounded-[20px] mb-6 overflow-hidden p-4 py-4">
      <div className="flex justify-between items-start">
        {/* Subscription plan title */}
        <span className="text-black text-sm font-semibold font-['Hind_Vadodara'] leading-normal">
          {subscriptionType} {subscriptionPlan}
        </span>

        {/* Main price */}
        <span className="text-emerald-500 text-2xl font-semibold font-['Hind_Vadodara'] leading-none">
          {price}
        </span>
      </div>

      <div className="flex justify-between items-end mt-2">
        {/* Billing info */}
        <span className="text-black/60 text-[0.6rem] font-normal font-['Libre_Baskerville'] leading-normal">
          Fakturert hver 30. dag
        </span>

        {/* Strikethrough price (for discounted plans) */}
        {showStrikethrough && (
          <span className="text-black/60 text-[0.6rem] font-normal font-['Libre_Baskerville'] leading-normal">
            {pricePerDay}
          </span>
        )}

        {/* Price per day (only for 1-month plan) */}
        {pricePerDay && !showStrikethrough && (
          <span className="text-black/60 text-xs font-normal font-['Libre_Baskerville'] leading-normal">
            {pricePerDay}
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;