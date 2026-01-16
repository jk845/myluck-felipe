import React from 'react';
import LazyImage from '@/components/ui/lazy-image';
import MilaPhoto from '@/assets/mila_photo_2.jpg';

interface CTASectionProps {
  onStartRegistration: () => void;
  onLeadMagnet: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onStartRegistration,
  onLeadMagnet
}) => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white w-full">
      <div className="max-w-screen-2xl mx-auto">
        {/* Container with image */}
        <div className="relative w-full ">
          {/* Background image */}
          <LazyImage 
            src={MilaPhoto} 
            alt="Mila - Din personlige trener" 
            className="w-full h-full object-cover"
          />
          
          {/* Content overlay */}
          <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            {/* Top content */}
            <div className="relative">
              {/* Header with sparkles */}
              <div className="flex items-start justify-between">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-['Hind_Vadodara'] leading-tight max-w-[220px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-[400px]">
                  Hva venter du på?
                </h2>
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">✨</span>
              </div>
              
              <p className="text-white text-sm sm:text-base md:text-lg font-normal font-['Libre_Baskerville'] mt-2 sm:mt-3 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]">
                Hver dag du venter er en dag mindre med din beste versjon av deg selv
              </p>
            </div>
            
            {/* Bottom CTA Buttons */}
            <div className="space-y-3 max-w-sm sm:max-w-md mx-auto w-full">
              <button 
                onClick={onStartRegistration}
                className="w-full h-12 sm:h-14 md:h-16 bg-pink-200 rounded-full flex justify-center items-center transition-all hover:scale-105 hover:bg-pink-300"
              >
                <span className="text-black text-lg sm:text-xl md:text-2xl font-semibold font-['Hind_Vadodara']">
                  Start din reise nå!
                </span>
              </button>
              
              <button 
                onClick={onLeadMagnet}
                className="w-full h-12 sm:h-14 md:h-16 rounded-full border-2 border-white/80 backdrop-blur-sm bg-white/10 flex justify-center items-center gap-2.5 transition-all hover:bg-white/20 hover:scale-105"
              >
                {/* Instagram icon */}
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
                <span className="text-white text-base sm:text-lg md:text-xl font-medium font-['Hind_Vadodara']">
                  Spør meg på DM
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};