import React from 'react';

interface PaymentProcessingLoaderProps {
  attempt?: number;
  maxAttempts?: number;
}

export const PaymentProcessingLoader: React.FC<PaymentProcessingLoaderProps> = ({ 
  attempt = 0, 
  maxAttempts = 120 
}) => {
  const progress = maxAttempts > 0 ? (attempt / maxAttempts) * 100 : 0;
  
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Animated Logo/Icon */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-200 to-pink-200 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-fuchsia-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Behandler betaling...
          </h2>
          
          <p className="text-gray-600 mb-6">
            Vennligst vent mens vi bekrefter din betaling hos Mollie
          </p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progress, 90)}%` }}
            />
          </div>
          
          {/* Status text */}
          <p className="text-sm text-gray-500">
            {attempt < 10 && "Kobler til betalingstjenesten..."}
            {attempt >= 10 && attempt < 30 && "Verifiserer betalingsinformasjon..."}
            {attempt >= 30 && attempt < 60 && "Venter på bekreftelse fra banken..."}
            {attempt >= 60 && attempt < 90 && "Dette tar litt lengre tid enn vanlig..."}
            {attempt >= 90 && "Nesten ferdig, bare et øyeblikk til..."}
          </p>
          
          {/* Timeout warning */}
          {attempt > 100 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                Betalingen tar lengre tid enn forventet. Du kan prøve å oppdatere siden.
              </p>
            </div>
          )}
        </div>
        
        {/* Security badges */}
        <div className="mt-6 flex items-center justify-center gap-4 opacity-60">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Sikker betaling</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <img src="/mollie-logo.svg" alt="Mollie" className="h-4" />
            <span>Powered by Mollie</span>
          </div>
        </div>
      </div>
    </div>
  );
};