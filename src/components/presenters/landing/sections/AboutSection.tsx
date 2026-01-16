import React from 'react';
import LazyImage from '@/components/ui/lazy-image';
import Photo1 from '@/assets/girl_success_1.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section className="w-full h-screen bg-white flex items-center overflow-hidden">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-black text-3xl sm:text-4xl font-semibold font-['Hind_Vadodara'] leading-tight mb-4">
          Som en mor til 2 har jeg vært der. Nå vil jeg hjelpe deg.
        </h2>
        <div className="overflow-hidden">
          <LazyImage 
            src={Photo1} 
            alt="Mila - Din personlige trener" 
            className="w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
                         <h2 className="text-black text-3xl sm:text-4xl font-semibold font-['Hind_Vadodara'] leading-tight mt-4">
               
               Akkurat som jeg har hjulpet hundrevis av andre damer
        </h2>
                     <h2 className="text-black text-3xl sm:text-4xl font-semibold font-['Hind_Vadodara'] leading-tight text-center">
               
          👇🏻👇🏻
        </h2>
        <h2> </h2>
      </div>
    </section>
  );
};