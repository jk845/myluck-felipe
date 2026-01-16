import React from 'react';
import { monthToText } from '@/utils/subscription.utils';

interface OrderDetailsSimpleProps {
  subscriptionType?: string;
  subscriptionPlan: string;
  price: string;
  renewalDate: string;
  nextPaymentDate?: string;
  nextCycleDate?: string;
  icon?: string;
}

export const OrderDetailsSimple: React.FC<OrderDetailsSimpleProps> = ({
  subscriptionType = 'Premium',
  subscriptionPlan,
  price,
  renewalDate,
  nextPaymentDate,
  nextCycleDate,
  icon = '🔮'
}) => {
  return (
    <div className="bg-[#f5f0fd]/30 rounded-2xl p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-[#f5f0fd] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-black text-lg font-semibold font-['Hind_Vadodara']">
                  {subscriptionType}
                </div>
                <div className="text-black/60 text-sm font-normal font-['Libre_Baskerville']">
                  {monthToText(subscriptionPlan)}
                </div>
              </div>
              <div className="text-black text-lg font-semibold font-['Hind_Vadodara']">
                kr {price}
              </div>
            </div>
          </div>
        </div>
        
        {/* Date information */}
        <div className="border-t border-black/10 pt-3 space-y-2">
          {nextPaymentDate && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="text-black/70 text-sm font-normal font-['Libre_Baskerville']">
                <span className="font-medium">Neste betaling:</span> {nextPaymentDate}
              </div>
            </div>
          )}
          {nextCycleDate && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="text-black/70 text-sm font-normal font-['Libre_Baskerville']">
                <span className="font-medium">Abonnement fornyes:</span> {nextCycleDate}
              </div>
            </div>
          )}
          {!nextPaymentDate && !nextCycleDate && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="text-black/70 text-sm font-normal font-['Libre_Baskerville']">
                <span className="font-medium">Fornyes:</span> {renewalDate}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};