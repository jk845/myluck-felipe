import { useState } from "react";
import ActionButton from "@/components/ui/action-button";
import { OrderDetailsSimple } from "@/components/ui/order-details-simple";

interface PaymentSuccessStepProps {
  onNext: (feedback?: string) => void;
  customerInfo: {
    orderId: string;
    subscriptionType: string;
    subscriptionPlan: string;
    renewalDate: string;
    nextPaymentDate: string;
    nextCycleDate: string;
    price: string;
  };
}


const PaymentSuccessStep: React.FC<PaymentSuccessStepProps> = ({ onNext, customerInfo }) => {
  const [feedback, setFeedback] = useState("");
  
  const handleSubmit = () => {
    console.log('PaymentSuccessStep: Submitting with feedback:', feedback);
    onNext(feedback);
  };
  
  return (
    <div>
      {/* Success header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-6 text-black tracking-tighter">
          Betalingen er fullført! 🎉
        </h2>
        <p className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] leading-relaxed">
          Order ID {customerInfo.orderId}
        </p>
      </div>

      {/* Order details */}
      <div className="mb-8">
        <OrderDetailsSimple
          subscriptionType={customerInfo.subscriptionType}
          subscriptionPlan={customerInfo.subscriptionPlan}
          price={customerInfo.price}
          renewalDate={customerInfo.renewalDate}
          nextPaymentDate={customerInfo.nextPaymentDate}
          nextCycleDate={customerInfo.nextCycleDate}
        />
      </div>

      {/* Confirmation info */}
      <div className="p-6 bg-[#f5f5f7] rounded-2xl mb-8">
        <div className="flex items-start space-x-3">
          <div className="text-2xl flex-shrink-0">✅</div>
          <p className="text-sm text-black/80 font-['Libre_Baskerville'] leading-relaxed">
            Du vil motta en e-post med kvittering og innloggingsdetaljer.
          </p>
        </div>
      </div>

      {/* Feedback section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-8 text-black tracking-tighter text-left">
          Hva var din største bekymring som potensielt kunne stoppet deg fra å bli med? ❤️
        </h3>
        <div className="relative">
          <label className="absolute left-5 top-4 text-xs font-medium text-gray-600 pointer-events-none">
            Din tilbakemelding (valgfritt)
          </label>
          <textarea
            className="w-full h-32 px-5 pt-8 pb-3 rounded-2xl border-2 border-gray-100 bg-gray-50/50 focus:border-fuchsia-300 focus:bg-white focus:ring-4 focus:ring-fuchsia-50 focus:outline-none transition-all duration-300 text-lg font-medium text-gray-900 placeholder:text-gray-400 resize-none"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Skriv noen ord her..."
          />
        </div>
      </div>

      <div className="mt-12">
        <ActionButton onClick={handleSubmit}>
          Fortsett
        </ActionButton>
      </div>
    </div>
  );
};

export default PaymentSuccessStep;