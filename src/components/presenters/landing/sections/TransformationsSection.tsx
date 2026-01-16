import React from 'react';
import LazyImage from '@/components/ui/lazy-image';
import Photo1 from '@/assets/girl_success_1.jpg';
import Photo2 from '@/assets/girl_success_2.jpg';
import Photo3 from '@/assets/girl_success_3.jpg';
import Photo4 from '@/assets/girl_success_4.jpg';
import Features5 from '@/assets/features_5.jpg';

interface TransformationsSectionProps {
  onStartRegistration: () => void;
}

export const TransformationsSection: React.FC<TransformationsSectionProps> = ({
  onStartRegistration
}) => {
  const transformations = [
    { name: 'Benedikte', image: Photo1 },
    { name: 'Camilla', image: Photo2 },
    { name: 'Solveig', image: Photo3 },
    { name: 'Emma', image: Photo4 }
  ];

  return (
    <section className="w-full h-screen bg-white flex items-center overflow-hidden">
      <div className="max-w-md mx-auto px-4">
         {/* <h2 className="text-black text-3xl sm:text-4xl font-semibold font-['Hind_Vadodara'] leading-tight mb-8">
               Akkurat som jeg har hjulpet hundrevis av andre damer
        </h2> */}
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {transformations.map((item, index) => (
            <div key={index} className="relative aspect-square rounded-[20px] sm:rounded-[30px] overflow-hidden transition-transform hover:scale-105">
              <LazyImage 
                src={item.image} 
                alt={`${item.name} transformasjon`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white text-lg sm:text-xl font-semibold font-['Hind_Vadodara'] drop-shadow-lg">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Du? */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="w-full max-w-[150px] sm:max-w-[200px] relative aspect-square rounded-[20px] sm:rounded-[30px] overflow-hidden transition-transform hover:scale-105">
            <LazyImage 
              src={Features5} 
              alt="Du?" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-2xl sm:text-3xl font-bold font-['Hind_Vadodara'] drop-shadow-lg">Du?</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onStartRegistration}
          className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex justify-center items-center transition-all hover:scale-105 hover:shadow-lg"
        >
          <span className="text-white text-xl font-semibold font-['Hind_Vadodara']">
            Bli med i Myluck nå!
          </span>
        </button>
      </div>
    </section>
  );
};