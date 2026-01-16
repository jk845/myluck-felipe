import React from 'react';
import LazyImage from '@/components/ui/lazy-image';
import SectionPhoto1 from '@/assets/section_photo_1.jpg';

export const LessonsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-white w-full">
      <div className="max-w-md mx-auto">
        <h2 className="text-black text-2xl sm:text-3xl font-semibold font-['Hind_Vadodara'] leading-tight mb-6 sm:mb-8">
          Leksjoner i hvordan du holder deg sunn og i form som en travel mamma
        </h2>
        
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <LazyImage 
            src={SectionPhoto1} 
            alt="Leksjoner for travle mødre" 
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};