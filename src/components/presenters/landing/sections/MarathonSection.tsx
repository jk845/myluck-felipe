import React from 'react';
import LazyImage from '@/components/ui/lazy-image';
import SectionPhoto2 from '@/assets/section_photo_2.jpg';

export const MarathonSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-white w-full">
      <div className="max-w-md mx-auto">
        <h2 className="text-black text-2xl sm:text-3xl font-semibold font-['Hind_Vadodara'] leading-tight mb-6 sm:mb-8">
          Lær Milas hemmeligheter under Maraton-direktesendingene.
        </h2>
        
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <LazyImage 
            src={SectionPhoto2} 
            alt="Maraton-direktesendinger med Mila" 
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};