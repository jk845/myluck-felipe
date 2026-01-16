import React from 'react';
import ActionButton from '@/components/ui/action-button';

interface FinalCTASectionProps {
  onStartRegistration: () => void;
  onLeadMagnet: () => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onStartRegistration, onLeadMagnet }) => {
  return (
    <section className="py-12 px-6 bg-white w-full flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full mx-auto">
        <div className="bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 text-center">
          <span className="text-5xl mb-6 block">✨</span>
          <h2 className="text-3xl md:text-4xl font-bold font-['Hind_Vadodara'] mb-6">
            Hva venter du på?
          </h2>
          <p className="text-lg md:text-xl font-['Libre_Baskerville'] text-black/70 mb-8 max-w-2xl mx-auto">
            Hver dag du venter er en dag mindre med din beste versjon av deg selv
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <ActionButton 
              onClick={onStartRegistration}
              className="bg-fuchsia-100 text-black hover:bg-fuchsia-200 min-w-[240px]"
            >
              Start din reise nå!
            </ActionButton>
            
            <button
              onClick={onLeadMagnet}
              className="min-w-[240px] h-14 px-6 py-2.5 rounded-full border-2 border-fuchsia-100 backdrop-blur-lg flex items-center justify-center gap-2.5 hover:bg-fuchsia-100/20 transition-colors"
            >
              <svg className="w-5 h-6" fill="#D946EF" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              <span className="text-fuchsia-600 text-xl font-medium font-['Hind_Vadodara']">
                Spør meg på DM
              </span>
            </button>
          </div>
          
          <p className="text-sm text-black/60 font-['Libre_Baskerville'] mt-6">
            Tar bare 2 minutter å komme i gang
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
export { FinalCTASection };