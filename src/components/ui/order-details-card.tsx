import React from 'react';
import { monthToText } from '@/utils/subscription.utils';

interface OrderDetailsCardProps {
  orderId: string;
  subscriptionType?: string;
  subscriptionPlan: string;
  price: string;
  renewalDate: string;
  icon?: string;
}

export const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({
  orderId,
  subscriptionType = 'Premium',
  subscriptionPlan,
  price,
  renewalDate,
  icon = '🔮'
}) => {
  return (
    <section className="max-w-md mx-auto mb-10">
      <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
        Bestillingsdetaljer
      </h3>
      <p className="text-center text-black text-opacity-60 text-sm font-normal font-['Libre_Baskerville'] mb-4">
        Order ID {orderId}
      </p>
      <div className="w-full h-20 flex rounded-[10px]">
        <div className="w-20 h-full bg-[#f5f0fd] aspect-square rounded-[10px] flex items-center justify-center">
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="flex flex-col ml-2 w-full">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-black text-base font-semibold font-['Hind_Vadodara'] leading-[25px]">
                {subscriptionType}
              </div>
              <div className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-[25px]">
                {monthToText(subscriptionPlan)}
              </div>
              <div className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-[25px]">
                Fornyes {renewalDate}
              </div>
            </div>
            <div className="text-black text-base font-semibold font-['Hind_Vadodara'] leading-[25px]">
              kr {price}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};