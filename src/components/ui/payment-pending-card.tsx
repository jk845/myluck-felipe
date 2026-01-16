import React from 'react';
import { OrderDetailsCard } from './order-details-card';

interface PaymentPendingCardProps {
  isLoading: boolean;
  customerInfo: {
    orderId: string;
    subscriptionType?: string;
    subscriptionPlan: string;
    price: string;
    renewalDate: string;
  };
}

export const PaymentPendingCard: React.FC<PaymentPendingCardProps> = ({
  isLoading,
  customerInfo
}) => {
  // Check if we have valid customer info (not default values)
  const hasValidInfo = customerInfo.orderId && customerInfo.renewalDate;

  return (
    <>
      {/* Payment status section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <svg
              className="w-10 h-10 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-bold mb-2">
            {isLoading ? "Behandler betaling..." : "Venter på bekreftelse"}
          </h2>
          <p className="text-gray-600">
            {isLoading
              ? "Vennligst vent mens vi bekrefter betalingen din."
              : "Vi venter på bekreftelse fra betalingsleverandøren. Dette kan ta noen minutter."}
          </p>
        </div>
      </div>

      {/* Order details - only show if we have valid data */}
      {hasValidInfo ? (
        <OrderDetailsCard
          orderId={customerInfo.orderId}
          subscriptionType={customerInfo.subscriptionType}
          subscriptionPlan={customerInfo.subscriptionPlan}
          price={customerInfo.price}
          renewalDate={customerInfo.renewalDate}
        />
      ) : (
        // Skeleton loader for order details
        <section className="max-w-md mx-auto mb-10">
          <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-4">
            Bestillingsdetaljer
          </h3>
          <div className="w-full h-20 flex rounded-[10px]">
            <div className="w-20 h-full bg-gray-200 animate-pulse rounded-[10px]" />
            <div className="flex flex-col ml-2 w-full space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
              <div className="h-3 bg-gray-200 animate-pulse rounded w-32" />
              <div className="h-3 bg-gray-200 animate-pulse rounded w-40" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};