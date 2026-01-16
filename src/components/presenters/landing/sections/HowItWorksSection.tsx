import React from 'react';

interface HowItWorksSectionProps {
  onStartRegistration: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartRegistration }) => {
  return (
    <section className="py-16 px-4 bg-white w-full">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-10">
          <h2 className="text-3xl font-semibold font-['Hind_Vadodara']">
            Så enkelt er det
          </h2>
          <span className="text-3xl">👆</span>
        </div>
        
        {/* Steps */}
        <div className="space-y-6 mb-10">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-1">
                Fortell om deg selv
              </h3>
              <p className="text-gray-500 font-['Libre_Baskerville'] text-sm">
                2 min quiz
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-1">
                Få din personlige plan
              </h3>
              <p className="text-gray-500 font-['Libre_Baskerville'] text-sm">
                Tilpasset dine mål
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold font-['Hind_Vadodara'] mb-1">
                Start transformasjonen
              </h3>
              <p className="text-gray-500 font-['Libre_Baskerville'] text-sm">
                Med støtte hele veien
              </p>
            </div>
          </div>
        </div>
        
        {/* Special Offer Card */}
        <div className="bg-pink-100 rounded-3xl p-8 relative mb-6">
          {/* Gift Emoji */}
          <div className="absolute top-6 right-6 text-5xl">
            🎁
          </div>
          
          {/* Card Content */}
          <div className="pr-16 mb-6">
            <h3 className="text-2xl font-semibold font-['Hind_Vadodara'] mb-2">
              Spesialtilbud i dag
            </h3>
            
            <p className="text-base font-['Libre_Baskerville'] text-black">
              Se hvilke planer som<br />passer deg best
            </p>
          </div>
          
          {/* CTA Button */}
          <button 
            onClick={onStartRegistration}
            className="w-full h-14 bg-black text-white rounded-full text-xl font-semibold font-['Hind_Vadodara'] hover:scale-105 transition-transform flex items-center justify-center"
          >
            Start din reise nå!
          </button>
        </div>
        
        <p className="text-center text-gray-500 text-sm font-['Libre_Baskerville']">
          Tar bare 2 minutter å komme i gang
        </p>
      </div>
    </section>
  );
};