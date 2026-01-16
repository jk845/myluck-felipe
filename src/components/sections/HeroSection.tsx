import React from 'react';
import { RatingsDisplay } from '@/components/ratings/RatingsDisplay';

interface HeroSectionProps {
  onStartRegistration: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartRegistration }) => {
  return (
    <div className="max-w-md w-full mb-4 mx-auto flex flex-col items-center justify-self-end">
      <div className="pb-12 pt-8">
        <RatingsDisplay mode="dark" />
      </div>
      <h1 className="text-7xl font-semibold font-['Hind_Vadodara'] leading-none sm:leading-10 pb-3 text-white">
        Myluck
      </h1>
      <div className="w-60 text-center justify-start text-white text-sm font-bold font-['Libre_Baskerville']">
        Abonner på Myluck for å få tilgang til appen, direktesendinger og Transformasjons-Marathons
      </div>

      <button
        onClick={onStartRegistration}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 h-14 hover:bg-gray-100 transition-colors"
      >
        <span className="text-black text-xl font-semibold font-['Hind_Vadodara']">
          Få tilgang nå!
        </span>
      </button>
    </div>
  );
};

export default HeroSection;
export { HeroSection };