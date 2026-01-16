import React from 'react';
import LazyImage from '@/components/ui/lazy-image';
import ActionButton from '@/components/ui/action-button';

// Import images
import Photo1 from '@/assets/girl_success_1.jpg';
import Photo2 from '@/assets/girl_success_2.jpg';
import Photo3 from '@/assets/girl_success_3.jpg';
import Photo4 from '@/assets/girl_success_4.jpg';

interface TransformationsSectionProps {
  onStartRegistration: () => void;
}

const TransformationsSection: React.FC<TransformationsSectionProps> = ({ onStartRegistration }) => {
  return (
    <section className="py-12 px-6 bg-gray-50 w-full flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-['Hind_Vadodara'] text-center mb-12">
          Akkurat som jeg har hjulpet hundrevis av andre damer
        </h2>

        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {[
            { name: 'Benedikte', image: Photo1 },
            { name: 'Camilla', image: Photo2 },
            { name: 'Solveig', image: Photo3 },
            { name: 'Emma', image: Photo4 }
          ].map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="overflow-hidden rounded-[20px] aspect-square">
                <LazyImage 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-white text-xl font-semibold font-['Hind_Vadodara']">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block mb-8">
            <div className="w-40 h-40 bg-black/20 rounded-full flex items-center justify-center">
              <p className="text-white text-xl font-semibold font-['Hind_Vadodara']">Du?</p>
            </div>
          </div>
          
          <ActionButton 
            onClick={onStartRegistration}
            className="bg-fuchsia-100 text-black hover:bg-fuchsia-200"
          >
            Bli med i Myluck nå!
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default TransformationsSection;
export { TransformationsSection };